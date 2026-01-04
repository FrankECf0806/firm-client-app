import { add } from "@/utils/math";

describe("Math utilities", () => {
  describe("add", () => {
    it("should add two numbers correctly", () => {
      expect(add(2, 3)).toBe(5);
      expect(add(-1, 1)).toBe(0);
      expect(add(0, 0)).toBe(0);
    });
  });
});
