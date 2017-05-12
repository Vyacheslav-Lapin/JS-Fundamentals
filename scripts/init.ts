import {YTEmbedLink} from "./YTEmbedLink";

interface YTForm extends EventTarget {
    youTubeUrl: { value: string };
    endTime: { value: string };
}

addEventListener("DOMContentLoaded", () =>
    document.forms[0].addEventListener("submit", (evt: Event) => {
        evt.preventDefault();
        const {youTubeUrl: {value: youTubeUrl}, endTime: {value: endTime}} = evt.target as YTForm;

        //noinspection JSUnresolvedFunction
        prompt(
            "Скопируйте текст, нажав Ctrl+C",
            YTEmbedLink.parseForm(youTubeUrl, endTime).toString());
    }));

addEventListener("DOMContentLoaded", () => {});