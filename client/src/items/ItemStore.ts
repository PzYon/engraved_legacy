import {ICodeItem, IItem, IKeyword, INoteItem, ItemKind, ItemSearchQuery, IUrlItem} from "engraved-shared/dist";
import {BehaviorSubject, Observable, SubscriptionLike} from "rxjs";
import {ajax} from "rxjs/ajax";
import {AjaxResponse} from "rxjs/internal/observable/dom/AjaxObservable";
import {map} from "rxjs/internal/operators";
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
                    // return new NoteItem(item);
                    throw new Error(`item with kind "${item.itemKind}" is not supported.`);
            }
        });
    }
}