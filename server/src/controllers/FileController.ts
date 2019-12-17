import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { FileType, IFile } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import Config from "../Config";
import { BaseAuthenticatedController } from "./BaseAuthenticatedController";

cloudinary.config(Config.cloudinary);

export class FileController extends BaseAuthenticatedController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    this.authenticatedFileUpload("/files", this.uploadFile);
  }

  private uploadFile = (req: Request<any>, res: Response) => {
    const file: Express.Multer.File = (req as Request).file;

    cloudinary.uploader.upload(
      file.path,
      { public_id: req.user.mail + "/" + file.filename } as UploadApiOptions,
      (error, result: { secure_url: string }) => {
        console.log(result, error);

        this.createDbService(req)
          .insertImage({
            type: FileType.Image,
            url: result.secure_url
          })
          .then((addedFile: IFile) => res.send(addedFile));
      }
    );
  };
}
