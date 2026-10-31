import { describe, expect, it } from "vitest";
import { isActivePath } from "./isActivePath";

describe("isActivePath util Test Cases", () => {
  it("matches exact routes", () => {
    expect(isActivePath("/settings", "/settings")).toBe(true);
  });

  it("matches nested routes", () => {
    expect(isActivePath("/settings/appearances", "/settings")).toBe(true);
    expect(isActivePath("/profile/saved", "/profile")).toBe(true);
  });

  it("does not match partial path segments", () => {
    expect(isActivePath("/settings-other", "/settings")).toBe(false);
  });

  it("only matches the home route exactly", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/explore", "/")).toBe(false);
  });
});
