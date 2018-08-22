import {
  ICodeItem,
  IItem,
  IKeyword,
  INoteItem,
  ItemKind,
  ItemSearchQuery,
  IUrlItem,
  Util
} from "engraved-shared";
import { BehaviorSubject, Observable, Observer, SubscriptionLike } from "rxjs";
import { AjaxResponse } from "rxjs/ajax";
import { map } from "rxjs/operators";
import { AuthenticatedServerApi } from "../authentication/AuthenticatedServerApi";
import { CodeItem } from "./code/CodeItem";
import { NoteItem } from "./note/NoteItem";
import { UrlItem } from "./url/UrlItem";

export class ItemStore {
  private static cachedInstance: ItemStore;

  public static get instance(): ItemStore {
    if (!this.cachedInstance) {
      this.cachedInstance = new ItemStore();
    }
    return this.cachedInstance;
  }

  public items$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);
  public keywords$: BehaviorSubject<IKeyword[]> = new BehaviorSubject<IKeyword[]>([]);

  public searchText: string = "";

  private nextItemsSubscription: SubscriptionLike;

  private constructor() {}

  public toggleKeyword(keyword: IKeyword): boolean {
    const copy = [...this.keywords$.value];

    const isNew: boolean = Util.toggleArrayValue(
      copy,
      keyword,
      (k: IKeyword) => k._id === keyword._id
    );

    this.keywords$.next(copy);

    return isNew;
  }

  public addItem = (item: IItem): Observable<IItem> => {
    return AuthenticatedServerApi.post("items", item).pipe(map((r: AjaxResponse) => r.response));
  };

  // we send the item to the server and then update it in the (client) cache
  public updateItem = (item: IItem): Observable<IItem> => {
    return AuthenticatedServerApi.patch("items/" + item._id, item).pipe(
      map((r: AjaxResponse) => this.updateCache(item))
    );
  };

  public deleteItem = (itemId: string): Observable<any> => {
    return AuthenticatedServerApi.delete("items/" + itemId).pipe(
      map((r: AjaxResponse) => this.deleteFromCache(itemId))
    );
  };

  public searchKeywords = (searchText: string): Observable<IKeyword[]> => {
    return AuthenticatedServerApi.get<IKeyword[]>(
      `keywords${searchText ? `?q=${searchText}` : ""}`
    );
  };

  public loadItems = (): void => {
    if (this.nextItemsSubscription) {
      this.nextItemsSubscription.unsubscribe();
    }

    const keywords: IKeyword[] = this.keywords$.value;

    if (ItemStore.isInvalidSearchText(this.searchText) && keywords.length === 0) {
      this.items$.next([]);
      return;
    }

    const query: ItemSearchQuery = new ItemSearchQuery(
      this.searchText === "*" ? "" : this.searchText,
      keywords.map(k => k.name).join(ItemSearchQuery.keywordsSeparator)
    );

    console.log(`ItemStore: calling server @ "${query.toUrl()}"`);

    this.nextItemsSubscription = AuthenticatedServerApi.get<IItem[]>(
      `items?${query.toUrl()}`
    ).subscribe((items: IItem[]) => {
      this.items$.next(this.transformItems(items));
    });
  };

  public resetAndLoad(): void {
    this.keywords$.next([]);
    this.searchText = "";
    this.loadItems();
  }

  public getLocalItemOrLoad(id: string): Observable<IItem> {
    const localItem: IItem | undefined = this.items$.value.find(i => i._id === id);
    if (localItem) {
      return new Observable((observer: Observer<IItem>) => {
        observer.next(localItem);
        observer.complete();
      });
    }

    return AuthenticatedServerApi.get(`items/${id}`);
  }

  public static isInvalidSearchText(searchText: string) {
    return !searchText || searchText.trim().length === 0;
  }

  private transformItems(items: IItem[]): IItem[] {
    if (!items || !items.length) {
      return [];
    }

    return items.map((item: IItem) => {
      // todo: consider moving this logic to ItemKindRegistration instead?
      switch (item.itemKind) {
        case ItemKind.Note:
          return new NoteItem(item as INoteItem);
        case ItemKind.Code:
          return new CodeItem(item as ICodeItem);
        case ItemKind.Url:
          return new UrlItem(item as IUrlItem);
        default:
          // todo: return a default item instead?
          throw new Error(`item with kind "${item.itemKind}" is not supported.`);
      }
    });
  }

  private deleteFromCache(id: string): void {
    this.doWithCachedItem(id, (itemIndex: number, newItemsArray: IItem[]) => {
      newItemsArray.splice(itemIndex, 1);
      return newItemsArray;
    });
  }

  private updateCache(item: IItem): IItem {
    this.doWithCachedItem(
      item._id,
      (itemIndex: number, newItemsArray: IItem[]): IItem[] => {
        newItemsArray[itemIndex] = item;
        return newItemsArray;
      }
    );

    return item;
  }

  private doWithCachedItem(
    id: string,
    callback: (itemIndex: number, newItemsArray: IItem[]) => IItem[]
  ): void {
    const cachedItems: IItem[] = this.items$.value;
    const cachedItemIndex: number = cachedItems.findIndex(i => i._id === id);

    if (cachedItemIndex > -1) {
      const modifiedItems: IItem[] = callback(cachedItemIndex, [...cachedItems]);
      this.items$.next(modifiedItems);
    }
  }
}
