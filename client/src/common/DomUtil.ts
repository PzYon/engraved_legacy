export class DomUtil {
  public static isEmptyHtml(html: string) {
    const e = document.createElement("div");
    e.innerHTML = html;
    return e.innerText.trim().length === 0;
  }

  public static copyValueToClipBoard(value: string): void {
    const textArea: HTMLTextAreaElement = document.createElement("textarea");
    textArea.value = value;
    textArea.style.width = "0px";
    textArea.style.height = "0px";

    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("copy");

    textArea.parentNode.removeChild(textArea);
  }
}
