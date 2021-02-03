import { cleanup } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import getUsersHook from "./getUsersHook";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "@testing-library/jest-dom";

afterEach(cleanup);

describe("get Users hook test", () => {
  it("calling async get users", async () => {
    const { result, waitFor } = renderHook(() => getUsersHook());
    let [users, isUsersLoading, isUsersError] = result.current;

    describe("get users request loading boolean", () => {
      expect(isUsersLoading).toBe(true);
    });

    await waitFor(() => expect(result.current[1]).toBe(false));

    describe("no error while get users request", () => {
      expect(isUsersError).toBe(false);
    });

    describe("result object bigger than 2", () => {
      expect(result.current[0].length).toBeGreaterThan(2);

      expect(typeof result.current[0]).toBe("object");
    });
  });
});
