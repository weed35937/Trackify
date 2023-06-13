import {
  BusinessRounded,
  CallRounded,
  CloseRounded,
  DateRangeRounded,
  PersonRounded
} from "@mui/icons-material";
import { CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { updateProfile } from "../api/index";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import "react-datepicker/dist/react-datepicker.css";
import { updateUser } from "../redux/reducers/userSlice";

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

const UpdateDetails = ({ setOpenUpdateDetails }) => {
  // Hooks
  const { currentUser, role } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("trackify-token");
  const [loading, setLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = React.useState({
    username: "",
    department: ""
  });
  const [formData, setFormData] = React.useState(currentUser);

  // Functions
  // Set the texts input fields and performs all validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

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
      (role === "admin" &&
        !errorMessage.username &&
        formData.username &&
        currentUser.username !== formData.username) ||
      (role === "employee" &&
        !errorMessage.username &&
        formData.username &&
        formData.contact_number &&
        formData.department &&
        formData.joining_date &&
        (currentUser.username !== formData.username ||
          currentUser.contact_number !== formData.contact_number ||
          currentUser.department !== formData.department ||
          new Date(currentUser.joining_date).toString() !==
            new Date(formData.joining_date).toString()))
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [errorMessage, formData, role, currentUser]);

  // Performs the form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      updateProfile(formData, token)
        .then((res) => {
          if (res.status === 200) {
            dispatch(updateUser(res.data));
            dispatch(
              openSnackbar({
                message: "Profile updated successfully",
                severity: "success"
              })
            );
            setLoading(false);
            setButtonDisabled(false);
            setErrorMessage({
              ...errorMessage,
              apierror: ""
            });
            setOpenUpdateDetails(false);
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
          setOpenUpdateDetails(false);
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container>
          <Title>Update Details</Title>
          <CloseRounded
            style={{
              position: "absolute",
              top: "16px",
              right: "26px",
              cursor: "pointer",
              fontSize: "28px",
              color: "inherit"
            }}
            onClick={() => setOpenUpdateDetails(false)}
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
            {role === "employee" && (
              <>
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
                      selected={new Date(formData.joining_date)}
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
              </>
            )}
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

export default UpdateDetails;
