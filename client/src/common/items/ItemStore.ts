import {ICodeItem, IItem, IKeyword, INoteItem, ItemKind, ItemSearchQuery, IUrlItem} from "engraved-shared/dist";
import {BehaviorSubject, Observable, SubscriptionLike} from "rxjs";
import {ajax} from "rxjs/ajax";
import {AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";
import {map} from "rxjs/internal/operators";
import {Observer} from "rxjs/internal/types";
import {CodeItem} from "./CodeItem";
import {NoteItem} from "./NoteItem";
import {UrlItem} from "./UrlItem";

export class ItemStore {
    private static cachedInstance: ItemStore;

    public static get instance(): ItemStore {
        if (!this.cachedInstance) {
            this.cachedInstance = new ItemStore();
        }
        return this.cachedInstance;
    }

    public items$: BehaviorSubject<IItem[]> = new BehaviorSubject<IItem[]>([]);

    public searchText: string = "";
    public keywords: IKeyword[] = [];

    private nextItemsSubscription: SubscriptionLike;

    private constructor() {
    }

    public addItem = (item: IItem): Observable<IItem> => {
        return ajax.post("http://localhost:3001/items", item, {"Content-Type": "application/json"})
                   .pipe(map((r: AjaxResponse) => r.response));
    };

    // we send the item to the server and then update it in the (client) cache
    public updateItem = (item: IItem): Observable<IItem> => {
        return ajax.patch("http://localhost:3001/items/" + item._id, item, {"Content-Type": "application/json"})
                   .pipe(map((r: AjaxResponse) => this.updateCache(item)));
    };

    public searchKeywords = (searchText: string): Observable<IKeyword[]> => {
        return ajax.getJSON<IKeyword[]>(`http://localhost:3001/keywords${searchText ? `?q=${searchText}` : ""}`);
    };

    public loadItems = (): void => {
        if (this.nextItemsSubscription) {
            this.nextItemsSubscription.unsubscribe();
        }

        const query: ItemSearchQuery = new ItemSearchQuery(this.searchText,
                                                           this.keywords
                                                               .map(k => k.name)
                                                               .join(ItemSearchQuery.keywordsSeparator));

        console.log(`ItemStore: calling server @ "${query.toUrl()}"`);

        this.nextItemsSubscription = ajax.getJSON<IItem[]>(`http://localhost:3001/items?${query.toUrl()}`)
                                         .subscribe((items: IItem[]) => {
                                             this.items$.next(this.transformItems(items));
                                         });
    };

    public getLocalItemOrLoad(id: string): Observable<IItem> {
        const localItem: IItem | undefined = this.items$.value.find(i => i._id === id);
        if (localItem) {
            return new Observable((observer: Observer<IItem>) => {
                observer.next(localItem);
                observer.complete();
            });
        }

        return ajax.getJSON<IItem>(`http://localhost:3001/items/${id}`);
    }

    private transformItems(items: IItem[]): IItem[] {
        if (!items || !items.length) {
            return [];
        }

        return items.map((item: IItem) => {
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

    private updateCache(item: IItem): IItem {
        const cachedItems = this.items$.value;
        const cachedItemIndex: number = cachedItems.findIndex(i => i._id === item._id);

        if (cachedItemIndex > -1) {
            const updatedItems = [...cachedItems];
            updatedItems[cachedItemIndex] = item;

            this.items$.next([...updatedItems]);
        }

        return item;
    }
}