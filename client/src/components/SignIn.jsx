import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  EmailRounded,
  PasswordRounded,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { AdminLogin, EmployeeLogin } from "../api";
import { loginSuccess } from "../redux/reducers/userSlice";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import ForgetPassword from "./ForgetPassword";

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 22px 28px 40px 28px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary + 99};
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all 0.3s ease;
  @media (max-width: 600px) {
    padding: 22px 22px 40px 22px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Toggle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 4px;
  margin: 0px 0px 8px 0px;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  outline: none;
  transition: all 0.3s ease;
`;

const ToggleOption = styled.div`
  width: 100%;
  padding: 14px;
  border-bottom: 2px solid transparent;
  ${({ theme, selected }) =>
    selected &&
    `
    color: ${theme.primary};
    border-bottom: 2px solid ${theme.primary};
    `}
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
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

const ForgotPassword = styled.p`
  font-size: 15px;
  text-align: right;
  margin-right: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
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

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const SignIn = (props) => {
  const { setOpenSignUp } = props;
  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("admin");

  // reset password
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState({
    email: ""
  }); // error message for validation checks.
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // validation checks
    if (name === "email") {
      // Email validation regex pattern
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value) {
        setButtonDisabled(true);
      }

      if (value && !emailRegex.test(value)) {
        setErrorMessage({
          ...errorMessage,
          email: "Enter correct email format"
        });
        setButtonDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          email: ""
        });
      }
    }

    if (name === "password") {
      if (!value) {
        setButtonDisabled(true);
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    // If there is no error message and all the fields are filled, then enable the button
    if (!errorMessage.email && formData.email && formData.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errorMessage, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      if (selectedOption === "admin") {
        AdminLogin(formData)
          .then((res) => {
            if (res.status === 200) {
              dispatch(loginSuccess(res.data));
              dispatch(
                openSnackbar({
                  message: "Login Successful",
                  severity: "success"
                })
              );
              setLoading(false);
              setButtonDisabled(false);
              setErrorMessage({
                ...errorMessage,
                apierror: ""
              });
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
      } else {
        EmployeeLogin(formData)
          .then((res) => {
            if (res.status === 200) {
              dispatch(loginSuccess(res.data));
              dispatch(
                openSnackbar({
                  message: "Login Successful",
                  severity: "success"
                })
              );
              setLoading(false);
              setButtonDisabled(false);
              setErrorMessage({
                ...errorMessage,
                apierror: ""
              });
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
    }
  };

  return (
    <Container data-testid="signup">
      {showForgotPassword ? (
        <ForgetPassword setShowForgotPassword={setShowForgotPassword} />
      ) : (
        <div>
          <Title>SignIn</Title>
          <Toggle>
            <ToggleOption
              selected={selectedOption === "admin"}
              onClick={() => handleOptionClick("admin")}
            >
              Admin
            </ToggleOption>
            <ToggleOption
              selected={selectedOption === "employee"}
              onClick={() => handleOptionClick("employee")}
            >
              Employee
            </ToggleOption>
          </Toggle>
          <Form>
            <OutlinedInput>
              <EmailRounded />
              <Input
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
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
              // Show error message if there is one from the server
              errorMessage?.apierror && (
                <Error style={{ color: "red" }}>{errorMessage.apierror}</Error>
              )
            }
            {selectedOption === "admin" && (
              <ForgotPassword
                onClick={() => {
                  setShowForgotPassword(true);
                }}
              >
                Forgot password ?
              </ForgotPassword>
            )}
          </Form>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            buttonDisabled={buttonDisabled}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <>Sign In</>
            )}
          </Button>
          <Text>
            Don&apos;t have an account ?{" "}
            <TextButton onClick={() => setOpenSignUp(true)}>
              {" "}
              Sign Up
            </TextButton>
          </Text>
        </div>
      )}
    </Container>
  );
};

export default SignIn;
