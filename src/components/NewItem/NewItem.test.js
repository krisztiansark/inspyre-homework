import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import NewItem from "./NewItem";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("NewItem component tests", () => {
  it("NewItem component test", () => {
    const { queryByTestId, getByText, waitFor } = render(
      <Router>
        <NewItem />
      </Router>
    );

    describe("item renders the title", () => {
      expect(getByText("New Item")).toBeTruthy();

      expect(queryByTestId("shopping-button")).toBeEnabled();
    });

    describe("disabled next and back", () => {
      expect(getByText("Next")).toBeDisabled();
      expect(getByText("Back")).toBeDisabled();
    });

    describe("step 1 - name, description", () => {
      const name = queryByTestId("name-input");
      const description = queryByTestId("description-input");

      fireEvent.change(name, { target: { value: "name" } });

      expect(name.value).toBe("name");

      fireEvent.change(description, { target: { value: "description" } });

      expect(description.value).toBe("description");
    });

    describe("enabled next", () => {
      expect(getByText("Next")).not.toBeDisabled();
    });

    describe("pressing next", () => {
      fireEvent.click(getByText("Next"), { button: 0 });

      expect(getByText("Back")).toBeEnabled();

      expect(getByText("Pick a date:")).toBeTruthy();

      fireEvent.click(getByText("Next"), { button: 0 });

      expect(getByText("Reset")).toBeEnabled();

      expect(getByText("Submit")).toBeTruthy();
    });
  });
});
