import { getBarColor, getPeopleId } from ".";
import { BAR_COLORS } from "../constants";

describe("Helpers", () => {
  describe("getPeopleId", () => {
    it("should return people id correctly", () => {
      const id = getPeopleId("https://swapi.dev/api/people/1/");
      expect(id).toBe("1/");
    });
    it("should return people id correctly - no url", () => {
      const id = getPeopleId("");
      expect(id).toBe(undefined);
    });
  });
  describe("getBarColor", () => {
    it("should return right color - first bar", () => {
      const id = getBarColor(0);
      expect(id).toBe(BAR_COLORS[0]);
    });
    it("should return right color - second bar", () => {
      const id = getBarColor(1);
      expect(id).toBe(BAR_COLORS[1]);
    });
    it("should return right color - too many bars", () => {
      const id = getBarColor(9);
      expect(id).toBe(BAR_COLORS[0]);
    });
  });
});
