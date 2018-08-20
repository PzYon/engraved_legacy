export class DomUtil {
  public static isEmptyHtml(html: string) {
    const e = document.createElement("div");
    e.innerHTML = html;
    return e.innerText.trim().length === 0;
  }
}
