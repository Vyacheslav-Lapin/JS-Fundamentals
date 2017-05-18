import YTEmbedLink from "../_scripts/YTEmbedLink";
import YTTime from "../_scripts/YTTime";

describe("YTEmbedLink", () => {

    // noinspection SpellCheckingInspection
    it("YTEmbedLink constructor with YTTime constructor", () =>
        expect(new YTEmbedLink("dfsfsf", new YTTime(["3s", "2m", "1h"]), new YTTime(["4s", "2m", "1h"])).toString())
            .toBe("https://www.youtube.com/embed/dfsfsf?start=3723&end=3724&autoplay=1"));

    // noinspection SpellCheckingInspection
    it("YTEmbedLink constructor with YTTime.parse", () =>
        expect(new YTEmbedLink("khafgfdag", YTTime.parse("1h2m3s"), YTTime.parse("1h2m4s")).toString())
            .toBe("https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1"));

    // noinspection SpellCheckingInspection
    it("YTEmbedLink.parseForm", () =>
        expect(YTEmbedLink.parseForm("https://youtu.be/khafgfdag?t=1h2m3s", "1:2:4").toString())
            .toBe("https://www.youtube.com/embed/khafgfdag?start=3723&end=3724&autoplay=1"));
});
