import React from "react";
import styled from "styled-components";
import EmployeeRegister from "../components/EmployeeRegister";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminDashboard = () => {
  return (
    <Container>
      <EmployeeRegister />
    </Container>
  );
};

export default AdminDashboard;
