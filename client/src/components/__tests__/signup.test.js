import { render, screen } from "@testing-library/react";
import SignUp from "../SignUp";

test("signup", () => {
  render(<SignUp />);
  const linkElement = screen.getByTestId("signup");
  expect(linkElement).toBeInTheDocument();
});
