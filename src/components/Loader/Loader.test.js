import React from "react";
import { render } from "@testing-library/react";
import Loader from "./Loader";
import "@testing-library/jest-dom";

it("renders correctly", () => {
  const { queryByTestId } = render(<Loader open={true} />);

  expect(queryByTestId("loader-component")).toBeTruthy();

  expect(queryByTestId("loader-animation")).toBeVisible();

  expect(queryByTestId("loader-image")).toBeVisible();
});
