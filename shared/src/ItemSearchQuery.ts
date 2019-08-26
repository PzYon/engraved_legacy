import { ISorting } from "./ISorting";

export class ItemSearchQuery {
  public static readonly freeTextParamName = "q";
  public static readonly keywordsParamName = "keywords";
  public static readonly takeParamName = "take";
  public static readonly skipParamName = "skip";
  public static readonly keywordsSeparator = ",";
  public static readonly sortingDirectionParamName = "sortDirection";
  public static readonly sortingPropParamName = "sortProp";

  public get hasConditions(): boolean {
    return !!this.fullText || !!this.keywords;
  }

  public constructor(
    private fullText: string,
    public keywords: string[],
    public skip?: number,
    public take?: number,
    public sorting?: ISorting
  ) {}

  public getFullText(): string {
    return this.fullText ? this.fullText.trim() : "";
  }

  public toUrl(): string {
    const keyValuePairs: {} = {};

    keyValuePairs[ItemSearchQuery.freeTextParamName] = this.getFullText();

    if (this.keywords && this.keywords.length) {
      keyValuePairs[ItemSearchQuery.keywordsParamName] = this.keywords.join(
        ItemSearchQuery.keywordsSeparator
      );
    }

    if (this.take > 0) {
      keyValuePairs[ItemSearchQuery.takeParamName] = this.take;
      keyValuePairs[ItemSearchQuery.skipParamName] = this.skip;
    }

    if (this.sorting) {
      keyValuePairs[ItemSearchQuery.sortingPropParamName] = this.sorting.propName;
      keyValuePairs[ItemSearchQuery.sortingDirectionParamName] = this.sorting.direction;
    }

    return Object.keys(keyValuePairs)
      .map(k => `${k}=${keyValuePairs[k]}`)
      .join("&");
  }
}
