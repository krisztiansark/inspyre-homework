import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import UserProfile from "./UserProfile";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import apple from "../../images/apple.png";

const mockSelect = jest.fn(() => {});

const user = [
  {
    id: "000173fc6ccd85-1e5e6f497fb6b1",
    name: "Jessica M. Decker",
    profilePictureUrl: apple,
  },
];

describe("UserProfile component tests", () => {
  it("Render component test", () => {
    const { queryByTestId, getByText, waitFor } = render(
      <Router>
        <UserProfile
          users={user}
          handlePerson={mockSelect}
          selected={[new Array(4).fill(false)]}
        />
      </Router>
    );

    describe("div and title renders", () => {
      expect(queryByTestId("profile-div")).toBeTruthy();

      expect(getByText("Jessica M. Decker")).toBeVisible();
    });
  });
});
