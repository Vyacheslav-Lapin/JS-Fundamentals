import OS from "./OS";
import YTEmbedLink from "./YTEmbedLink";

interface YTForm extends EventTarget {
    youTubeUrl: { value: string };
    endTime: { value: string };
}

addEventListener("DOMContentLoaded", () =>
    document.forms[0].addEventListener("submit", submitEvent => {
        submitEvent.preventDefault();
        const {youTubeUrl: {value: youTubeUrl}, endTime: {value: endTime}} = submitEvent.target as YTForm;
        prompt(
            `Скопируйте текст, нажав ${OS.copyToBufferDefaultHotKeys}`,
            YTEmbedLink.parseForm(youTubeUrl, endTime).toString());
    }));

// {
//     Array.prototype.flatMap = flatMap;
//
//     Object.defineProperty(Array.prototype, "flatMap", {
//         configurable: false,
//         enumerable: false,
//         writable: false,
//     });
//
//
//     // noinspection TypeScriptUnresolvedFunction
//     [0, 1, 2, 3, 4, 5].flatMap(x => [x, x + 1]); // [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6]
//
//     function flatMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => U[]): U[] {
//         return [].concat(...array.map(callbackfn));
//     }
// }
