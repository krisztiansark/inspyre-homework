import React from "react";
import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import deleteHook from "./deleteHook";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";

jest.setTimeout(7000);
describe("delete hook test", () => {
  it("Item component test", async () => {
    const id = "asdadfdsgfgdfsgfsgasdf";
    const { result, waitFor } = renderHook(() => deleteHook());

    describe("hook function initialized", () => {
      expect(typeof result.current[1]).toBe("function");
    });

    describe("call delete request with bad id", () => {
      act(() => {
        result.current[1](id);
      });
    });

    describe("delete request loading boolean", () => {
      expect(result.current[2]).toBe(true);
    });

    // Wait to receive error with bad request id
    await waitFor(() => expect(result.current[2]).toBe(true), {
      timeout: 5000,
    });
  });
});
