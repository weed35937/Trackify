import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  height: 70vh;
  color: ${({ theme }) => theme.text_primary};
`;

const Loader = () => {
  return (
    <Container>
      <CircularProgress sx={{ color: "inherit" }} />
      Loading
    </Container>
  );
};

export default Loader;
