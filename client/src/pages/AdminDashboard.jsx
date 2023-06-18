/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllEmployees } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import EmployeeTableCard from "../components/Cards/EmployeeTableCard";
import Loader from "../components/Loader";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    padding: 6px 0px;
  }
  background: ${({ theme }) => theme.background};
`;

const ItemTitle = styled.div`
  display: flex;
  font-size: ${({ fontSize }) => fontSize || "24px"};
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: ${({ smallfontSize }) => smallfontSize || "18px"};
  }
`;

const EmployeeTable = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 768px) {
    border-radius: 0px;
  }
  transition: all 0.5s ease-in-out;
`;

const EmployeeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: ${({ theme }) => theme.text_secondary + 20};
`;

const TableTop = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 22px 20px;
  background: ${({ theme }) => theme.table_header};
  color: white;
  gap: 12px;
  @media (max-width: 768px) {
    padding: 16px 10px;
    gap: 8px;
  }
  transition: all 0.5s ease-in-out;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 1vw;
  font-weight: 500;

  @media (max-width: 1000px) {
    font-size: 1.4vw;
  }
  @media (max-width: 768px) {
    font-size: 1.6vw;
  }
  @media (max-width: 600px) {
    font-size: 1.8vw;
  }
`;

const Error = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 400;
  padding: 4px 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 4px 18px;
  }
`;

const AdminDashboard = () => {
  // Hooks
  const { currentUser, reload } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("trackify-token");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        await getAllEmployees(token).then((res) => {
          setEmployees(res.data.employees);
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.response) {
          setLoading(false);
          setError(err.response.data.message);
        } else {
          setLoading(false);
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error"
            })
          );
        }
      }
    };
    fetchEmployees();
  }, [token, currentUser, dispatch, reload]);

  return (
    <Container>
      {loading || error ? (
        <>
          {loading && <Loader />}
          {error && <Error style={{ color: "red" }}>Error: {error}</Error>}
        </>
      ) : (
        // Employee list in table format
        <div>
          <EmployeeTable>
            <ItemTitle
              fontSize="20px"
              smallfontSize="16px"
              style={{
                padding: "16px 22px",
                margin: "0px"
              }}
            >
              Employee List
            </ItemTitle>
            <TableTop>
              <Heading style={{ width: "30%" }} />
              <Heading style={{ width: "80%", justifyContent: "start" }}>
                Username
              </Heading>
              <Heading>Contact No</Heading>
              <Heading style={{ width: "50%" }}>Department</Heading>
              <Heading>Joining Date</Heading>
              <Heading>Status</Heading>
            </TableTop>
            <EmployeeList>
              {employees.map((employee) => {
                return (
                  <EmployeeTableCard key={employee._id} employee={employee} />
                );
              })}
            </EmployeeList>
          </EmployeeTable>
        </div>
      )}
    </Container>
  );
};

export default AdminDashboard;
