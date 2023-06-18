/* eslint-disable no-confusing-arrow */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllEmployees } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import EmployeeCard from "../components/Cards/EmployeeCard";
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5px;
  padding: 2px 0px 20px 0px;
`;

const ItemTitle = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 4px 16px;
  }
`;

const EmployeeListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  width: 100%;
  justify-content: start;
  @media (max-width: 600px) {
    justify-content: center;
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

const EmployeeList = () => {
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
        <div>
          <Wrapper>
            <ItemTitle>All Employees</ItemTitle>
            <EmployeeListWrapper numberOfCards={employees.length}>
              {employees.map((employee) => {
                return (
                  // <EmployeeTableCard key={employee._id} employee={employee} />
                  <EmployeeCard key={employee._id} employee={employee} />
                );
              })}
            </EmployeeListWrapper>
          </Wrapper>
        </div>
      )}
    </Container>
  );
};

export default EmployeeList;
