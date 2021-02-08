import React from "react";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import postHook from "./postHook";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";

jest.setTimeout(7000);
describe("delete hook test", () => {
  it("Item component test", async () => {
    const obj = {};
    const { result, waitFor } = renderHook(() => postHook(obj));

    describe("hook function initialized", () => {
      expect(typeof result.current[0]).toBe("boolean");
      expect(typeof result.current[1]).toBe("boolean");
      expect(typeof result.current[2]).toBe("function");
      expect(typeof result.current[3]).toBe("object");
    });

    describe("call post request with bad obj", () => {
      act(() => {
        result.current[2](obj);
      });
    });

    describe("post request loading boolean", () => {
      expect(result.current[0]).toBe(true);
    });

    // // Wait to receive error with bad request obj
    await waitFor(() => expect(result.current[1]).toBe(true), {
      timeout: 6000,
    });
  });
});
