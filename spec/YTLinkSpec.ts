import YTLink from "../_scripts/YTLink";
import YTTime from "../_scripts/YTTime";

describe("YTLink", () => {

    // noinspection SpellCheckingInspection
    it("constructor", () =>
        expect(new YTLink("khafgfdagrr", YTTime.parse("1h2m3s")).toString())
            .toBe("https://youtu.be/khafgfdagrr?t=1h2m3s"));

    it("parse", () =>
        expect(YTLink.parse("https://youtu.be/k0jC50TcdR0?t=1h5m2s").toString())
            .toBe("https://youtu.be/k0jC50TcdR0?t=1h5m2s"));
});
