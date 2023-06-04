import React, { useState } from "react";
import styled from "styled-components";
import {
  EmailRounded,
  PasswordRounded,
  PersonRounded,
  Visibility,
  VisibilityOff
} from "@mui/icons-material";

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
`;

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text_secondary};
  &:focus ${OutlinedInput} {
    border: 1px solid ${({ theme }) => theme.primary};
  }
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
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container data-testid="signup">
      <Wrapper>
        <Title>SignUp</Title>
        <Form>
          <OutlinedInput>
            <PersonRounded />
            <Input placeholder="Username" />
          </OutlinedInput>
          <OutlinedInput>
            <EmailRounded />
            <Input placeholder="Email" />
          </OutlinedInput>
          <OutlinedInput>
            <PasswordRounded />
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
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
        </Form>
        <Button>Create Account</Button>
        <Text>
          Already have an account? <TextButton>SignIn</TextButton>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
