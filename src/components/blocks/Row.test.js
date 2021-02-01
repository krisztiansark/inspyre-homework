import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Row from "./Row";

it("renders correctly", () => {
  const { queryByTestId } = render(<Row />);
  expect(queryByTestId("row-component")).toBeTruthy();
});
