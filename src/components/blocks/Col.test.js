import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Col from "./Col";

it("renders correctly", () => {
  const { queryByTestId } = render(<Col />);

  expect(queryByTestId("col-component")).toBeTruthy();
});
