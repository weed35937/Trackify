import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
`;

const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.card};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;
const Loader = () => {
  return (
    <Container>
      <Background>
        <CircularProgress
          sx={{ color: "inherit" }}
          style={{ width: "32px", height: "32px" }}
        />
      </Background>
    </Container>
  );
};

export default Loader;
