import {
  BusinessRounded,
  CallRounded,
  CloseRounded,
  DateRangeRounded,
  EmailRounded,
  PasswordRounded,
  PersonRounded
} from "@mui/icons-material";
import { CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { employeeRegister } from "../api/index";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import "react-datepicker/dist/react-datepicker.css";
import { reload } from "../redux/reducers/userSlice";

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

const EmployeeRegister = ({ setOpenEmployeeRegister }) => {
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
  // Set the texts input fields and performs all validation
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

  // Performs the form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      employeeRegister(formData, token)
        .then((res) => {
          if (res.status === 200) {
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
            setOpenEmployeeRegister(false);
            dispatch(reload());
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
          setOpenEmployeeRegister(false);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container>
          <Title>Register Employee</Title>
          <CloseRounded
            style={{
              position: "absolute",
              top: "16px",
              right: "26px",
              cursor: "pointer",
              fontSize: "28px",
              color: "inherit"
            }}
            onClick={() => setOpenEmployeeRegister(false)}
          />
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
                <DatePicker
                  selected={formData.joining_date}
                  onChange={(date) => {
                    setFormData({ ...formData, joining_date: date });
                  }}
                  onFocus={(e) => {
                    e.target.readOnly = true;
                  }}
                  onBlur={(e) => {
                    e.target.readOnly = false;
                  }}
                  placeholderText="Joining Date"
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                  style={{ color: "inherit !important;" }}
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
      </Modal>
    </Body>
  );
};

export default EmployeeRegister;
