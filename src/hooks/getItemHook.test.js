import React from "react";
import { renderHook } from "@testing-library/react-hooks";
import getItemHook from "./getItemHook";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";

jest.setTimeout(7000);
describe("get item hook test", () => {
  it("get Item hook test", async () => {
    const id = "asdadfdsgfgdfsgfsgasdf";
    const { result, waitFor } = renderHook(() => getItemHook(id));

    describe("initialized with an object", () => {
      expect(typeof result.current[0]).toBe("object");
    });
    describe("loading state", () => {
      expect(result.current[1]).toBe(true);
    });

    await waitFor(() => expect(result.current[2]).toBe(true), {
      timeout: 5000,
    });
  });
});
