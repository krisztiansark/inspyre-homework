import { renderHook } from "@testing-library/react-hooks";
import getHook from "./getHook";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";

jest.setTimeout(7000);

describe("get hook test", () => {
  it("Item component test", async () => {
    const { result, waitFor } = renderHook(() => getHook());

    describe("get request loading boolean", () => {
      expect(result.current[1]).toBe(true);
    });

    await waitFor(() => expect(result.current[1]).toBe(false), {
      timeout: 6000,
    });

    describe("no error while get request", () => {
      expect(result.current[2]).toBe(false);
    });

    describe("result object", () => {
      expect(typeof result.current[0]).toBe("object");
    });
  });
});
