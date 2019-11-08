import { IUser } from "engraved-shared";
import { Express } from "express";
import { Request, Response } from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import { Db } from "mongodb";
import passport from "passport";
import * as Google from "passport-google-oauth";
import { IOAuth2StrategyOption } from "passport-google-oauth";
import * as PassportJwt from "passport-jwt";
import Config from "../Config";
import { DbService } from "../db/DbService";
import { BaseController } from "./BaseController";

export class AuthenticationController extends BaseController {
  public constructor(app: Express, db: Db) {
    super(app, db);

    app.use(passport.initialize());

    app.route(Config.webServer.apiUrlPrefix + "/auth/google/init").get(
      passport.authenticate("google", {
        session: false,
        scope: ["openid", "profile", "email"]
      })
    );

    app
      .route(Config.webServer.apiUrlPrefix + "/auth/google/callback")
      .get(
        passport.authenticate("google", { session: false }),
        AuthenticationController.generateJwt
      );

    const dbService: DbService = new DbService(db, null);
    this.registerJwtAuth(dbService);
    this.registerGoogleAuth(dbService);
  }

  private static generateJwt(req: Request, res: Response): void {
    const userId: string = (req as any).user._id;

    const accessToken = jwt.sign({}, Config.authentication.jwtSecret, {
      expiresIn: Config.authentication.jwtExpiration,
      audience: Config.authentication.jwtAudience,
      issuer: Config.authentication.jwtIssuer,
      subject: userId.toString()
    });

    res.redirect(Config.authentication.clientCallbackUrl + accessToken);
  }

  private registerJwtAuth(dbService: DbService): void {
    const jwtOptions: PassportJwt.StrategyOptions = {
      jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: Config.authentication.jwtSecret,
      issuer: Config.authentication.jwtIssuer,
      audience: Config.authentication.jwtAudience
    };

    passport.use(
      new PassportJwt.Strategy(jwtOptions, (payload, done) => {
        dbService.getUserById(payload.sub).then((user: IUser) => {
          if (user) {
            console.log("processing request for user " + user.mail);
            done(null, user, payload);
          } else {
            done(null);
          }
        });
      })
    );
  }

  private registerGoogleAuth(dbService: DbService): void {
    const googleOptions: IOAuth2StrategyOption = {
      clientID: Config.authentication.googleClientId,
      clientSecret: Config.authentication.googleClientSecret,
      callbackURL: Config.authentication.googleCallbackUrl
    };

    passport.use(
      new Google.OAuth2Strategy(
        googleOptions,
        (accessToken, refreshToken, profile, done) => {
          dbService
            .ensureUser({
              displayName: profile.displayName,
              mail: profile.emails[0].value,
              image: profile.photos[0].value,
              memberSince: undefined
            })
            .then((user: IUser) => {
              done(null, user);
            });
        }
      )
    );
  }
}
