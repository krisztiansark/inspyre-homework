import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Item from "./Item";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

// data-testid="item-container"

afterEach(cleanup);

describe("Item component tests", () => {
  it("Item component test", async () => {
    const item = { name: "Grapefruit", id: "0001775eca4043-08569ea47e00ac" };

    const { queryByTestId, getByText } = render(
      <Router>
        <Item open={true} item={item} />
      </Router>
    );

    describe("by passing the id, item renders correctly", () => {
      expect(queryByTestId("item-container")).toBeVisible();

      expect(queryByTestId("item-name")).toBeTruthy();

      expect(getByText("Grapefruit")).toBeTruthy();

      expect(getByText("Check Details")).toBeVisible();

      expect(getByText("Keep")).not.toBeVisible();
    });

    describe("Click remove button, appears confirmation", () => {
      fireEvent.click(queryByTestId("remove-button"));
      expect(getByText("Keep")).toBeVisible();
      expect(getByText("Yes")).toBeVisible();
      expect(getByText("Check Details")).not.toBeVisible();
    });
  });
});
