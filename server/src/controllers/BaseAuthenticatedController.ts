import { SharedConstants } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import { Db } from "mongodb";
import multer from "multer";
import passport from "passport";
import Config from "../Config";
import { BaseController } from "./BaseController";
import { IApiError } from "./IApiError";

const multerUploads = multer({
  storage: multer.diskStorage({
    destination: "../files_temp/"
  })
}).single(SharedConstants.fileUpload.name);

export abstract class BaseAuthenticatedController extends BaseController {
  protected constructor(private app: Express, db: Db) {
    super(db);
  }

  private static authenticate(): any {
    return passport.authenticate(["jwt"], { session: false });
  }

  protected authenticatedFileUpload(
    url: string,
    callback: (req: Request, res: Response) => void
  ) {
    return this.app
      .route(Config.webServer.apiUrlPrefix + url)
      .post(
        BaseAuthenticatedController.authenticate(),
        multerUploads,
        callback
      );
  }

  protected authenticatedGet<T>(
    url: string,
    action: (req: Request) => Promise<T>
  ) {
    this.app
      .route(Config.webServer.apiUrlPrefix + url)
      .get(
        BaseAuthenticatedController.authenticate(),
        this.getActionHandler(action)
      );
  }

  protected authenticatedPatch<T>(
    url: string,
    action: (req: Request) => Promise<T>
  ) {
    this.app
      .route(Config.webServer.apiUrlPrefix + url)
      .patch(
        BaseAuthenticatedController.authenticate(),
        this.getActionHandler(action)
      );
  }

  protected authenticatedPost<T>(
    url: string,
    action: (req: Request) => Promise<T>
  ) {
    this.app
      .route(Config.webServer.apiUrlPrefix + url)
      .post(
        BaseAuthenticatedController.authenticate(),
        this.getActionHandler(action)
      );
  }

  protected authenticatedDelete<T>(
    url: string,
    action: (req: Request) => Promise<T>
  ) {
    this.app
      .route(Config.webServer.apiUrlPrefix + url)
      .delete(
        BaseAuthenticatedController.authenticate(),
        this.getActionHandler(action)
      );
  }

  private getActionHandler<T>(action: (req: Request) => Promise<T>) {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const r: T = await action(req);
        if (r) {
          res.send(r);
        } else {
          res.statusCode = 404;
          res.send();
        }
      } catch (e) {
        res.statusCode = 500;
        res.send({
          message: e.message,
          stack: e.stack
        } as IApiError);
      }
    };
  }
}
