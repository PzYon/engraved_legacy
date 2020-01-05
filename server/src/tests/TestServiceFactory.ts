import { Db } from "mongodb";
import { IUser } from "engraved-shared";
import { DbService } from "../services/DbService";
import { FileService } from "../services/files/FileService";
import { ICloudinary } from "../services/files/ICloudinary";
import { IServiceFactory } from "../services/IServiceFactory";

export class TestServiceFactory implements IServiceFactory {
  public constructor(
    private db: Db,
    private user: IUser,
    private cloudinaryMock: ICloudinary
  ) {}

  public createDbService(): DbService {
    return new DbService(this.db, this.user, this);
  }

  public createFileService(): FileService {
    return new FileService(this.createDbService(), this.cloudinaryMock);
  }
}
