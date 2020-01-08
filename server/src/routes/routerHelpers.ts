import { IApiError, SharedConstants } from "engraved-shared";
import { Express, IRoute } from "express";
import { Request, Response } from "express-serve-static-core";
import multer from "multer";
import passport from "passport";
import Config from "../Config";

export enum HttpAction {
  Get = "get",
  Post = "post",
  Patch = "patch",
  Delete = "delete",
  FileUpload = "file"
}

const multerUploads = multer({
  storage: multer.diskStorage({
    destination: "../files_temp/"
  })
}).single(SharedConstants.fileUpload.name);

export const logRoute = (
  method: string,
  url: string,
  prefix?: string
): void => {
  console.log((prefix ?? "") + (method.toUpperCase().padEnd(7) + ": " + url));
};

export const registerRoute = <T>(
  app: Express,
  url: string,
  httpAction: HttpAction,
  action: (req: Request) => Promise<T>
): IRoute => {
  const httpMethod =
    httpAction === HttpAction.FileUpload ? HttpAction.Post : httpAction;

  const handlers =
    httpAction === HttpAction.FileUpload
      ? [
          passport.authenticate(["jwt"], { session: false }),
          multerUploads,
          getActionHandler(action)
        ]
      : [
          passport.authenticate(["jwt"], { session: false }),
          getActionHandler(action)
        ];

  logRoute(httpAction, url);

  return app.route(Config.webServer.apiUrlPrefix + url)[httpMethod](handlers);
};

const getActionHandler = <T>(action: (req: Request) => Promise<T>) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const actionResult: T = await action(req);
      if (actionResult) {
        res.send(actionResult);
      } else {
        res.statusCode = 404;
        res.send();
      }
    } catch (e) {
      console.error("ERROR " + e.message);

      res.statusCode = 500;
      res.send({
        message: e.message,
        stack: e.stack
      } as IApiError);
    }
  };
};
