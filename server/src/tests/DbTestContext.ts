import { IItem, ItemKind, IUser } from "engraved-shared";
import { Db, InsertOneWriteOpResult, MongoClient } from "mongodb";
import Config from "../Config";
import { DbService } from "../DbService";

export class DbTestContext {
  public connection: MongoClient;
  public db: Db;
  public dbService: DbService;
  public currentUser: IUser;
  public otherUser: IUser;

  public async setUp(): Promise<void> {
    this.connection = await MongoClient.connect(
      (global as any)["__MONGO_URI__"],
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    this.db = await this.connection.db((global as any)["__MONGO_DB_NAME__"]);

    await this.db
      .collection(Config.db.collections.items)
      .createIndex({ "$**": "text" });

    let service = new DbService(this.db, null);

    this.currentUser = await service.ensureUser({
      displayName: "Mar Dog",
      image: null,
      mail: "mar.dog@dogmar.io",
      memberSince: new Date()
    });

    this.otherUser = await service.ensureUser({
      displayName: "Another User",
      image: null,
      mail: "not.me@dogmar.io",
      memberSince: new Date()
    });

    this.dbService = new DbService(this.db, this.currentUser);
  }

  public async tearDown(): Promise<void> {
    await this.dropTable(Config.db.collections.items);
    await this.dropTable(Config.db.collections.keywords);
    await this.dropTable(Config.db.collections.files);
    await this.dropTable(Config.db.collections.users);
    await this.connection.close();
  }

  public createSampleItem(
    title: string = "Foo",
    userId?: string,
    keywords?: string[]
  ): IItem {
    const user = userId || this.currentUser._id;
    return {
      keywords: (keywords || []).map(k => ({ name: k, user_id: user })),
      title: title,
      editedOn: new Date(),
      itemKind: ItemKind.Code,
      description: null,
      user_id: user
    };
  }

  public async insertSampleItem(
    title?: string,
    userId?: string
  ): Promise<IItem> {
    const result: InsertOneWriteOpResult<any> = await this.db
      .collection(Config.db.collections.items)
      .insertOne(this.createSampleItem(title, userId));

    return result.ops[0];
  }

  private async dropTable(name: string): Promise<void> {
    await this.db.collection(name).deleteMany({});
  }
}
