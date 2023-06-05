import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  EmailRounded,
  PasswordRounded,
  PersonRounded,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { AdminRegister } from "../api";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 22px 28px 40px 28px;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text_secondary + 99};
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 18px 0px;
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
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.primary_hover};
  }
  ${({ buttonDisabled }) =>
    buttonDisabled &&
    `
    background-color: #cccccc;
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

const SignUp = () => {
  // hooks
  const [showPassword, setShowPassword] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    username: "",
    email: "",
    password: ""
  }); // error message for validation checks.
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

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
      // Password validation regex pattern
      if (value && value.length < 8) {
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
      } else {
        setErrorMessage({
          ...errorMessage,
          password: ""
        });
      }
    }

    if (name === "username") {
      if (!value) {
        setButtonDisabled(true);
      }
      // Username validation regex pattern
      const usernameRegex = /^[A-Za-z0-9\s]+$/;

      if (value && !usernameRegex.test(value)) {
        setErrorMessage({
          ...errorMessage,
          username: "Username must contain only letters, numbers and spaces"
        });
        setButtonDisabled(true);
      } else {
        setErrorMessage({
          ...errorMessage,
          username: ""
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
      !errorMessage.username &&
      !errorMessage.email &&
      !errorMessage.password &&
      formData.username &&
      formData.email &&
      formData.password
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errorMessage, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage({
      ...errorMessage,
      apierror: ""
    });

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      AdminRegister(formData)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setButtonDisabled(false);
            setErrorMessage({
              ...errorMessage,
              apierror: ""
            });
            console.log(res.data);
          }
        })
        .catch((err) => {
          setLoading(false);
          setButtonDisabled(false);
          setErrorMessage({
            ...errorMessage,
            apierror: err.response.data.message
          });
        });
    }
  };

  return (
    <Container data-testid="signup">
      <Wrapper>
        <Title>SignUp</Title>
        <Form>
          <OutlinedInput>
            <PersonRounded />
            <Input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              maxLength={16}
            />
          </OutlinedInput>
          {
            // Show error message if there is one
            errorMessage?.username && (
              <Error style={{ color: "red" }}>{errorMessage.username}</Error>
            )
          }
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
            // Show error message if there is one
            errorMessage?.password && (
              <Error style={{ color: "red" }}>{errorMessage.password}</Error>
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
          onClick={(e) => handleSubmit(e)}
          buttonDisabled={buttonDisabled}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <>Create Account</>
          )}
        </Button>
        <Text>
          Already have an account? <TextButton>SignIn</TextButton>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
