/* eslint-disable no-underscore-dangle */
import {
  AccessTimeFilledRounded,
  AddTaskRounded,
  BusinessRounded,
  CloseRounded,
  DateRangeRounded,
  DeleteRounded
} from "@mui/icons-material";
import { CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import { reload } from "../redux/reducers/userSlice";
import "react-datepicker/dist/react-datepicker.css";
import { deleteTask, updateTask } from "../api";

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

const TextInputArea = styled.textarea`
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

const Select = styled.select`
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

const Option = styled.option`
  width: 100%;
  font-size: 16px;
  height: 200px;
  outline: none;
  border: none;
  margin: 0px 4px;
  background-color: ${({ theme }) => theme.card};
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

const DeleteButton = styled.button`
  width: 100%;
  border: none;
  outline: none;
  padding: 14px;
  border-radius: 10px;
  color: #fc2003;
  background: #fc200320;
  border: 1px solid #fc200320;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

const UpdateTask = ({ setOpenUpdateTask, task }) => {
  // Hooks
  const dispatch = useDispatch();
  const token = localStorage.getItem("trackify-token");
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState({ apierror: "" });
  const [formData, setFormData] = React.useState(task);

  // Functions
  // Sets the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    // If there is no error message and all the fields are filled, then enable the button
    if (
      formData.task_description &&
      formData.task_type &&
      formData.start_time &&
      formData.time_taken &&
      (formData.task_type !== task.task_type ||
        new Date(formData.start_time).toString() !==
          new Date(task.start_time).toString() ||
        formData.time_taken.toString() !== task.time_taken.toString() ||
        formData.task_description !== task.task_description)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    formData,
    task.start_time,
    task.task_description,
    task.task_type,
    task.time_taken
  ]);

  // delete the task
  const handleDelete = (e) => {
    e.preventDefault();
    setDeleteLoading(true);

    deleteTask(task._id, token)
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            openSnackbar({
              message: res.data.message,
              severity: "success"
            })
          );
          setDeleteLoading(false);
          setButtonDisabled(false);
          setErrorMessage({
            ...errorMessage,
            apierror: ""
          });
          dispatch(reload());
          setOpenUpdateTask({
            state: false,
            task: null
          });
        }
      })
      .catch((err) => {
        setButtonDisabled(false);
        if (err.response) {
          setDeleteLoading(false);
          setErrorMessage({
            ...errorMessage,
            apierror: err.response.data.message
          });
        } else {
          setDeleteLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error"
            })
          );
        }
      });
  };

  // Submits the form data
  const handleSubmit = (e) => {
    e.preventDefault();

    // If there is no error message, then submit the form
    if (!buttonDisabled) {
      setLoading(true);
      setButtonDisabled(true);
      updateTask(formData, token)
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              openSnackbar({
                message: res.data.message,
                severity: "success"
              })
            );
            setLoading(false);
            setButtonDisabled(false);
            setErrorMessage({
              ...errorMessage,
              apierror: ""
            });
            dispatch(reload());
            setOpenUpdateTask({
              state: false,
              task: null
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
  };

  return (
    <Body>
      <Modal
        open
        onClose={() => {
          setOpenUpdateTask({
            task: null,
            state: false
          });
        }}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Container>
          <Title>Update Task</Title>
          <CloseRounded
            style={{
              position: "absolute",
              top: "16px",
              right: "26px",
              cursor: "pointer",
              fontSize: "28px",
              color: "inherit"
            }}
            onClick={() => {
              setOpenUpdateTask({
                task: null,
                state: false
              });
            }}
          />
          <Form>
            <DisplayFlex>
              <OutlinedInput>
                <BusinessRounded />
                <Select
                  type="text"
                  placeholder="Task type"
                  name="task_type"
                  value={formData.task_type}
                  onChange={handleInputChange}
                >
                  <Option value="" disabled selected hidden>
                    Task Type
                  </Option>
                  <Option value="break">Break</Option>
                  <Option value="meeting">Meeting</Option>
                  <Option value="work">Work</Option>
                </Select>
              </OutlinedInput>
              <OutlinedInput>
                <DateRangeRounded />
                <DatePicker
                  selected={new Date(formData.start_time)}
                  onChange={(date) => {
                    setFormData({ ...formData, start_time: date });
                  }}
                  onFocus={(e) => {
                    e.target.readOnly = true;
                  }}
                  onBlur={(e) => {
                    e.target.readOnly = false;
                  }}
                  placeholderText="Start Date"
                  maxDate={new Date()}
                  dateFormat="dd-MM-yyyy"
                  showYearDropdown
                  scrollableYearDropdown
                />
              </OutlinedInput>
            </DisplayFlex>
            <OutlinedInput>
              <AccessTimeFilledRounded />
              <Input
                type="number"
                placeholder="Time taken (in minutes)"
                name="time_taken"
                value={formData.time_taken}
                onChange={handleInputChange}
              />
            </OutlinedInput>
            <OutlinedInput
              style={{
                alignItems: "start"
              }}
            >
              <AddTaskRounded />
              <TextInputArea
                type="text"
                placeholder="Task Description"
                name="task_description"
                value={formData.task_description}
                onChange={handleInputChange}
                rows={3}
              />
            </OutlinedInput>
            {
              // Show error message if there is one from the server
              errorMessage?.apierror && (
                <Error style={{ color: "red" }}>{errorMessage.apierror}</Error>
              )
            }
          </Form>
          <DisplayFlex>
            <DeleteButton onClick={(e) => handleDelete(e)}>
              {deleteLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  {" "}
                  <DeleteRounded
                    sx={{
                      fontSize: "18px"
                    }}
                  />
                  Delete Task
                </>
              )}
            </DeleteButton>
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
                <>Update Task</>
              )}
            </Button>
          </DisplayFlex>
        </Container>
      </Modal>
    </Body>
  );
};

export default UpdateTask;
