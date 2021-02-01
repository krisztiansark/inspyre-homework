import React from "react";
import { render } from "@testing-library/react";
import Error from "./Error";
import "@testing-library/jest-dom";

it("Error message renders correctly", () => {
  const { queryByTestId, getByText } = render(<Error open={false} />);

  expect(queryByTestId("main-col")).toBeVisible();

  expect(getByText("Please refresh the page 🍋")).toEqual(
    expect.not.stringContaining("Please")
  );

  expect(queryByTestId("h4-lemon")).toBeVisible();
});
