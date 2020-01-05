import { IUser } from "engraved-shared";
import { Request } from "express-serve-static-core";
import { Db } from "mongodb";
import { DbService } from "./DbService";
import { Cloudinary } from "./files/Cloudinary";
import { FileService } from "./files/FileService";
import { IServiceFactory } from "./IServiceFactory";

export class ServiceFactory implements IServiceFactory {
  public constructor(private db: Db, private req: Request) {}

  public createDbService(): DbService {
    return new DbService(this.db, this.req.user as IUser, this);
  }

  public createFileService(): FileService {
    return new FileService(this.createDbService(), new Cloudinary());
  }
}
