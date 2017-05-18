import YTTime from "../_scripts/YTTime";

describe("YTTime constructor", () => {

    it("with 3 values works well", () =>
        expect(new YTTime(["3s", "2m", "1h"]).toString()).toBe("1h2m3s"));

    it("with NaN works well", () =>
        expect(new YTTime(["3s", "2m", NaN.toString()]).toString()).toBe("2m3s"));

    it("with 3 values toSeconds works well", () =>
        expect(new YTTime(["3s", "2m", "1h"]).toSeconds()).toBe(((60 + 2) * 60) + 3));
});

describe("YTTime.parse", () => {

    it("with hours", () =>
        expect(YTTime.parse("1h2m3s").toString()).toBe("1h2m3s"));

    it("without hours", () =>
        expect(YTTime.parse("2m3s").toString()).toBe("2m3s"));

    it("toSeconds", () =>
        expect(YTTime.parse("1h2m3s").toSeconds()).toBe(((60 + 2) * 60) + 3));
});

describe("YTTime.parseForm", () => {

    it("with hours", () =>
        expect(YTTime.parseForm("1:2:3").toString()).toBe("1h2m3s"));

    it("without hours", () =>
        expect(YTTime.parseForm("2:3").toString()).toBe("2m3s"));

    it("without hours and minutes", () =>
        expect(YTTime.parseForm("3").toString()).toBe("3s"));
});
