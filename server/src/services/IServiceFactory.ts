import { DbService } from "./DbService";
import { FileService } from "./files/FileService";

export interface IServiceFactory {
  createDbService(): DbService;

  createFileService(): FileService;
}
