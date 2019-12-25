import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import { Cloudinary } from "../files/Cloudinary";
import { FileService } from "../files/FileService";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

export class FileController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedFileUpload("/files", this.uploadFile);
  }

  private uploadFile = (req: Request<any>, res: Response) => {
    const file: Express.Multer.File = (req as Request).file;

    this.getFileService(req)
      .uploadFile(file)
      .then(f => res.send(f));
  };

  private getFileService(req: Request<any>): FileService {
    return new FileService(this.createDbService(req), new Cloudinary());
  }
}
