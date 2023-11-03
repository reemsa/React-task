import { render } from "@testing-library/react";
import App from "./App";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  lazy: () => ({
    __esModule: true,
    default: () => <div>Lazy-loaded Component</div>,
  }),
}));

describe("App", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
