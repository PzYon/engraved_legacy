export class ItemSearchQuery {
  public static readonly freeTextParamName = "q";
  public static readonly keywordsParamName = "keywords";
  public static readonly keywordsSeparator = ",";

  public get hasConditions(): boolean {
    return !!this.fullText || !!this.keywords;
  }

  public constructor(private fullText: string, private keywords: string) {}

  public getFullText(): string {
    return this.fullText ? this.fullText.trim() : "";
  }

  public getKeywords(): string[] {
    return !this.keywords ? [] : this.keywords.split(ItemSearchQuery.keywordsSeparator);
  }

  public toUrl(): string {
    return `${ItemSearchQuery.freeTextParamName}=${this.getFullText()}&${
      ItemSearchQuery.keywordsParamName
    }=${this.getKeywords().join(ItemSearchQuery.keywordsSeparator)}`;
  }
}
