import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Label from "./Label";

it("renders correctly", () => {
  const { queryByTestId } = render(<Label />);

  expect(queryByTestId("label-component")).toBeTruthy();
});
