import { IFile } from "engraved-shared";
import { Express } from "express";
import { Request } from "express-serve-static-core";
import { IRequest } from "../IRequest";
import { HttpAction, registerRoute } from "./routeStuff";

export const registerFileRoutes = (app: Express) => {
  registerRoute(
    app,
    "/files",
    HttpAction.FileUpload,
    (req: IRequest): Promise<IFile> => {
      const file: Express.Multer.File = (req as Request).file;

      return req.serviceFactory.createFileService().uploadFile(file);
    }
  );
};
