import { Button } from "@mui/material";
import { getRows } from "./utils";

describe("getRows", () => {
  it("should return rows with right fields - no data", () => {
    const rows = getRows([]);
    expect(rows.length).toBe(0);
  });
  it("should return rows with right fields - with data", () => {
    const rows = getRows([
      {
        name: "first person",
        height: "172",
        gender: "male",
        eye_color: "blue",
        url: "/1",
        hair_color: "black",
        created: "20-10-2023",
        films: [],
      },
    ]);
    expect(rows.length).toBe(1);
    expect(rows).toEqual([
      {
        details: (
          <Button href="/details/undefined" variant="contained">
            Details
          </Button>
        ),
        eye_color: "blue",
        gender: "male",
        height: "172",
        name: "first person",
      },
    ]);
  });
});
