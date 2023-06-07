import {
  BusinessRounded,
  CallRounded,
  DateRangeRounded,
  EmailRounded,
  PasswordRounded,
  PersonRounded
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { employeeRegister } from "../api/index";
import { openSnackbar } from "../redux/reducers/snackbarSlice";

const Container = styled.div`
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

const DisplayFlex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  color: ${({ theme }) => theme.text_primary};
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

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
`;

const EmployeeRegister = () => {
  // Hooks
  const dispatch = useDispatch();
  const token = localStorage.getItem("trackify-token");
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState({
    username: "",
    email: "",
    department: "",
    password: ""
  });
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    department: "",
    password: "",
    contact_number: "",
    joining_date: ""
  });

  // Functions
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

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // If there is no error message and all the fields are filled, then enable the button
    if (
      !errorMessage.username &&
      !errorMessage.email &&
      !errorMessage.password &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.contact_number &&
      formData.department &&
      formData.joining_date
    ) {
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
      employeeRegister(formData, token)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            dispatch(
              openSnackbar({
                message: "Employee added Successful",
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
          setLoading(false);
          setButtonDisabled(false);
          setErrorMessage({
            ...errorMessage,
            apierror: err.response?.data?.message
          });
        });
    }
  };

  return (
    <Container>
      <Title>Register Employee</Title>
      <Form>
        <OutlinedInput>
          <PersonRounded />
          <Input
            type="text"
            placeholder="Employee Name"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
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
            type="text"
            placeholder="Employee Email"
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
          <CallRounded />
          <Input
            type="text"
            pattern="\d*"
            maxLength="10"
            placeholder="Contact Number"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
          />
        </OutlinedInput>
        <DisplayFlex>
          <OutlinedInput>
            <BusinessRounded />
            <Input
              type="text"
              placeholder="Department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            />
          </OutlinedInput>
          <OutlinedInput>
            <DateRangeRounded />
            <Input
              type={formData.joining_date ? "date" : "text"}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              placeholder="Joining Date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleInputChange}
            />
          </OutlinedInput>
        </DisplayFlex>
        <OutlinedInput>
          <PasswordRounded />
          <Input
            type="text"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
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
          <>Create Account</>
        )}
      </Button>
    </Container>
  );
};

export default EmployeeRegister;
