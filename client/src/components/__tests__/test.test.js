import { render, screen } from "@testing-library/react";
import Test from "../Test";

test("test", () => {
  render(<Test />);
  const linkElement = screen.getByTestId("test-1");
  expect(linkElement).toBeInTheDocument();
});
