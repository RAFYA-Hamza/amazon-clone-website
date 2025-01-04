import { formatCurrencey } from "../../scripts/utils/money.js";

describe("test suite: formatCurrency", () => {
  it("convert cents into dollars", () => {
    expect(formatCurrencey(2095)).toEqual("20.95");
  });

  it("works with 0", () => {
    expect(formatCurrencey(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatCurrencey(2000.6)).toEqual("20.01");
  });
});
