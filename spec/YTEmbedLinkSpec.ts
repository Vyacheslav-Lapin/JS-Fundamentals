import YTEmbedLink from "../_scripts/YTEmbedLink";
import YTLink from "../_scripts/YTLink";
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

describe("YTLink", () => {

    it("constructor", () =>
        expect(new YTLink("khafgfdagrr", YTTime.parse("1h2m3s")).toString())
            .toBe("https://youtu.be/khafgfdagrr?t=1h2m3s"));

    it("parse", () =>
        expect(YTLink.parse("https://youtu.be/k0jC50TcdR0?t=1h5m2s").toString())
            .toBe("https://youtu.be/k0jC50TcdR0?t=1h5m2s"));

    it("YTEmbedLink constructor with YTTime constructor", () =>
        expect(new YTEmbedLink("dfsfsf", new YTTime(["3s", "2m", "1h"]), new YTTime(["4s", "2m", "1h"])).toString())
            .toBe("https://www.youtube.com/embed/dfsfsf?start=3723&end=3724&autoplay=1"));

    it("YTEmbedLink constructor with YTTime.parse", () =>
        expect(new YTEmbedLink("khafgfdag", YTTime.parse("1h2m3s"), YTTime.parse("1h2m4s")).toString())
            .toBe("https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1"));

    it("YTEmbedLink.parseForm", () =>
        expect(YTEmbedLink.parseForm("https://youtu.be/khafgfdag?t=1h2m3s", "1:2:4").toString())
            .toBe("https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1"));
});
