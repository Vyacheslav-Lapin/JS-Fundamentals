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
