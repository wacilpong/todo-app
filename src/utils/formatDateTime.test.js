import formatDateTime from "./formatDateTime";

describe("should parse datetime exactly", () => {
  const mockDate01 = "2019-07-19 07:37:23";
  const mockDate02 = "2020-03-23 21:16:42";

  it("return date bundle", () => {
    expect(formatDateTime(mockDate01, "date")).toBe("2019-07-19");
    expect(formatDateTime(mockDate02, "date")).toBe("2020-03-23");
  });

  it("return time", () => {
    expect(formatDateTime(mockDate01, "time")).toBe("07:37");
    expect(formatDateTime(mockDate02, "time")).toBe("21:16");
  });

  it("return time string", () => {
    expect(formatDateTime(mockDate01, "timeStr")).toBe("07시 37분");
    expect(formatDateTime(mockDate02, "timeStr")).toBe("21시 16분");
  });

  it("return default date bundle if type param is wrong, with join flag", () => {
    expect(formatDateTime(mockDate01, "wrong", "/")).toBe("2019/07/19");
    expect(formatDateTime(mockDate02, "wrong", ".")).toBe("2020.03.23");
  });
});
