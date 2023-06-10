import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { findUserByEmail, resetPassword } from "../api";
import OTP from "./OTP";

const Container = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 18px 0px 12px 0px;
  gap: 10px;
`;

const OutlinedInput = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  outline: none;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  &:focus {
    outline: none;
  }
`;

const Error = styled.p`
  font-size: 12px;
  margin: 0px 4px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.button};
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  ${({ buttonDisabled }) =>
    buttonDisabled &&
    `
    background: #cccccc;
    color: #666666;
    cursor: not-allowed;
  `}
`;

const ForgetPassword = ({ setShowForgotPassword }) => {
  // Hooks
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: ""
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // verify otp
  const [showOTP, setShowOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Sends Otp to the user registered email id
  const sendOtp = () => {
    if (!resetDisabled) {
      setResetDisabled(true);
      setLoading(true);
      findUserByEmail(formData.email)
        .then((res) => {
          if (res.status === 200) {
            setShowOTP(true);
            setResetDisabled(false);
            setLoading(false);
          }
        })
        .catch((err) => {
          setResetDisabled(false);
          setLoading(false);
          if (err.response) {
            setErrorMessage({
              ...errorMessage,
              apierror: err.response.data.message
            });
          } else {
            dispatch(
              openSnackbar({
                message: err.message,
                severity: "error"
              })
            );
          }
        });
    }
  };

  // Sets the form input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // validation checks
    if (name === "email") {
      // Email validation regex pattern
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value) {
        setResetDisabled(true);
      }

      if (value && !emailRegex.test(value)) {
        setErrorMessage({
          ...errorMessage,
          email: "Please enter a valid email address!"
        });
        setResetDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          email: ""
        });
      }
    }
    if (name === "password") {
      if (!value) {
        setResetDisabled(true);
      }
      // Password validation regex pattern
      if (value && value.length < 8) {
        setErrorMessage({
          ...errorMessage,
          password: "Password must be atleast 8 characters long!"
        });
        setResetDisabled(true);
      } else if (value && value.length > 16) {
        setErrorMessage({
          ...errorMessage,
          password: "Password must be less than 16 characters long!"
        });
        setResetDisabled(true);
      } else if (
        value &&
        (!value.match(/[a-z]/g) ||
          !value.match(/[A-Z]/g) ||
          !value.match(/[0-9]/g) ||
          !value.match(/[^a-zA-Z\d]/g))
      ) {
        setErrorMessage({
          ...errorMessage,
          password:
            "Password must contain atleast one lowercase, uppercase, number and special character!"
        });
        setResetDisabled(true);
      } else if (
        formData.confirmPassword &&
        formData.confirmPassword !== value
      ) {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: "Passwords do not match!"
        });
        setResetDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          password: ""
        });
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        setResetDisabled(true);
      }
      if (value && value !== formData.password) {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: "Passwords do not match!"
        });
        setResetDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: ""
        });
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    // If there is no error message and all the fields are filled, then enable the button
    if (
      !errorMessage.email &&
      !errorMessage.password &&
      !errorMessage.confirmPassword &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    ) {
      setResetDisabled(false);
    } else {
      setResetDisabled(true);
    }
  }, [errorMessage, formData]);

  // After otv is verified this function resets the user updated password
  const performResetPassword = async () => {
    setShowOTP(false);
    setLoading(true);
    setResetDisabled(true);
    await resetPassword(formData.email, formData.password)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            openSnackbar({
              message: "Password Reset Successfully",
              severity: "success"
            })
          );
          setShowForgotPassword(false);
          setLoading(true);
          setOtpVerified(false);
        }
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error"
          })
        );
        setShowOTP(false);
        setOtpVerified(false);
      });
  };

  useEffect(() => {
    if (otpVerified) {
      performResetPassword();
    }
  });

  return (
    <Container>
      {!showOTP ? (
        <>
          <Title>Reset Password</Title>
          <CloseRounded
            style={{
              position: "absolute",
              top: "6px",
              right: "10px",
              cursor: "pointer"
            }}
            onClick={() => setShowForgotPassword(false)}
          />
          <Form>
            <OutlinedInput>
              <EmailRounded />
              <Input
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange(e)}
              />
            </OutlinedInput>
            {
              // Show error message if there is one
              errorMessage?.email && (
                <Error style={{ color: "red" }}>{errorMessage.email}</Error>
              )
            }
            <OutlinedInput>
              <PasswordRounded />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={formData.password}
                onChange={(e) => handleInputChange(e)}
              />
              {showPassword ? (
                <Visibility
                  sx={{ fontSize: "20px" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <VisibilityOff
                  sx={{ fontSize: "20px" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </OutlinedInput>
            {
              // Show error message if there is one
              errorMessage?.password && (
                <Error style={{ color: "red" }}>{errorMessage.password}</Error>
              )
            }
            <OutlinedInput>
              <PasswordRounded />
              <Input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange(e)}
              />
            </OutlinedInput>
            {
              // Show error message if there is one
              errorMessage?.confirmPassword && (
                <Error style={{ color: "red" }}>
                  {errorMessage.confirmPassword}
                </Error>
              )
            }
            {
              // Show error message if there is one
              errorMessage?.apierror && (
                <Error style={{ color: "red" }}>{errorMessage.apierror}</Error>
              )
            }
          </Form>
          <Button
            buttonDisabled={resetDisabled}
            onClick={() => {
              sendOtp();
            }}
            disabled={resetDisabled}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              "Reset Password"
            )}
          </Button>
        </>
      ) : (
        <OTP
          email={formData.email}
          name="User"
          otpVerified={otpVerified}
          setOtpVerified={setOtpVerified}
          reason="FORGOTPASSWORD"
        />
      )}
    </Container>
  );
};

export default ForgetPassword;
