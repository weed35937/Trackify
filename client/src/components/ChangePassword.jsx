import {
  CloseRounded,
  PasswordRounded,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updatePassword } from "../api/index";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import "react-datepicker/dist/react-datepicker.css";

const Body = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  max-width: 500px;
  width: 100%;
  border-radius: 8px;
  margin: 50px 20px;
  padding: 22px 28px 40px 28px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary};
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  outline: none;
  @media (max-width: 600px) {
    padding: 22px 20px 40px 20px;
  }
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 12px 0px;
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
  font-size: 14px;
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
  background: ${({ theme }) => theme.primary};
  color: white;
  font-size: 14px;
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

const ChangePassword = ({ setOpenChangePassword }) => {
  // Hooks
  const dispatch = useDispatch();
  const token = localStorage.getItem("trackify-token");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState({
    oldPassword: "",
    password: "",
    confirmPassword: ""
  });
  const [formData, setFormData] = React.useState({
    oldPassword: "",
    password: "",
    confirmPassword: ""
  });

  // Functions
  // Set the texts input fields and performs all validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "oldPassword") {
      if (value && value === formData.password) {
        setErrorMessage({
          ...errorMessage,
          oldPassword: "Same as previous password"
        });
        setButtonDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          oldPassword: ""
        });
      }
    }
    if (name === "password") {
      if (!value) {
        setButtonDisabled(true);
      }

      // Password validation regex pattern
      if (value && value === formData.oldPassword) {
        setErrorMessage({
          ...errorMessage,
          password: "Same as previous password"
        });
        setButtonDisabled(true);
      } else if (value && value.length < 8) {
        setErrorMessage({
          ...errorMessage,
          password: "Password must be atleast 8 characters long!"
        });
        setButtonDisabled(true);
      } else if (value && value.length > 16) {
        setErrorMessage({
          ...errorMessage,
          password: "Password must be less than 16 characters long!"
        });
        setButtonDisabled(true);
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
        setButtonDisabled(true);
      } else if (
        formData.confirmPassword &&
        formData.confirmPassword !== value
      ) {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: "Passwords do not match!"
        });
        setButtonDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          password: ""
        });
      }
    }

    if (name === "confirmPassword") {
      if (!value) {
        setButtonDisabled(true);
      }
      if (value && value !== formData.password) {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: "Passwords do not match!"
        });
        setButtonDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          confirmPassword: ""
        });
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // If there is no error message and all the fields are filled, then enable the button
    if (
      !errorMessage.oldPassword &&
      !errorMessage.password &&
      !errorMessage.confirmPassword &&
      formData.oldPassword &&
      formData.password &&
      formData.confirmPassword
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errorMessage, formData]);

  // Performs the form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      updatePassword(formData, token)
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              openSnackbar({
                message: "Password updated successfully!",
                severity: "success"
              })
            );
            setLoading(false);
            setButtonDisabled(false);
            setErrorMessage({
              ...errorMessage,
              apierror: ""
            });
            setOpenChangePassword(false);
          }
        })
        .catch((err) => {
          setButtonDisabled(false);
          if (err.response) {
            setLoading(false);
            setErrorMessage({
              ...errorMessage,
              apierror: err.response.data.message
            });
          } else {
            setLoading(false);
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

  return (
    <Body>
      <Modal
        open
        onClose={() => {
          setOpenChangePassword(false);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container>
          <Title>Change Password</Title>
          <CloseRounded
            style={{
              position: "absolute",
              top: "16px",
              right: "26px",
              cursor: "pointer",
              fontSize: "28px",
              color: "inherit"
            }}
            onClick={() => setOpenChangePassword(false)}
          />
          <Form>
            <OutlinedInput>
              <PasswordRounded />
              <Input
                name="oldPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Old Password"
                value={formData.oldPassword}
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
              errorMessage?.oldPassword && (
                <Error style={{ color: "red" }}>
                  {errorMessage.oldPassword}
                </Error>
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
              // Show error message if there is one from the server
              errorMessage?.apierror && (
                <Error style={{ color: "red" }}>{errorMessage.apierror}</Error>
              )
            }
          </Form>
          <Button
            onClick={(e) => {
              setErrorMessage({
                ...errorMessage,
                apierror: ""
              });
              handleSubmit(e);
            }}
            buttonDisabled={buttonDisabled}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>Update</>
            )}
          </Button>
        </Container>
      </Modal>
    </Body>
  );
};

export default ChangePassword;
