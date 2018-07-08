import {IUser} from "engraved-shared";
import {Express} from "express";
import {Request, Response} from "express-serve-static-core";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import * as Google from "passport-google-oauth";
import {IOAuth2StrategyOption} from "passport-google-oauth";
import * as PassportJwt from "passport-jwt";
import {DbService} from "../db/DbService";
import {authConfig} from "./authConfig";

const generateJwt = (req: Request, res: Response): void => {
    const userId = (req as any).user._id;

    const accessToken = jwt.sign({}, authConfig.jwtSecret, {
        expiresIn: '1 hour',
        audience: authConfig.jwtAudience,
        issuer: authConfig.jwtIssuer,
        subject: userId.toString()
    });

    res.redirect(authConfig.clientCallbackUrl + accessToken);
};

const registerJwtAuth = (dbService: DbService) => {
    const jwtOptions: PassportJwt.StrategyOptions = {
        jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: authConfig.jwtSecret,
        issuer: authConfig.jwtIssuer,
        audience: authConfig.jwtAudience
    };

    passport.use(new PassportJwt.Strategy(jwtOptions, (payload, done) => {
        dbService.getUserById(payload.sub)
                 .then((user: IUser) => {
                     if (user) {
                         console.log("processing request for user " + user.mail);
                         done(null, user, payload);
                     } else {
                         done(null);
                     }
                 });
    }));
};

const registerGoogleAuth = (dbService: DbService) => {
    const googleOptions: IOAuth2StrategyOption = {
        clientID: authConfig.googleClientId,
        clientSecret: authConfig.googleClientSecret,
        callbackURL: authConfig.googleCallbackUrl
    };

    passport.use(new Google.OAuth2Strategy(googleOptions,
                                           (accessToken, refreshToken, profile, done) => {
                                               dbService.ensureUser({
                                                                        displayName: profile.displayName,
                                                                        mail: profile.emails[0].value,
                                                                        image: profile.photos[0].value
                                                                    })
                                                        .then((user: IUser) => {
                                                            done(null, user);
                                                        });
                                           }
    ));

};

export const bootstrapAuthentication = (app: Express, dbService: DbService): void => {
    app.use(passport.initialize());

    app.get('/auth/google/init',
            passport.authenticate('google', {session: false, scope: ['openid', 'profile', 'email']}));
    app.get('/auth/google/callback',
            passport.authenticate('google', {session: false}),
            generateJwt);

    registerJwtAuth(dbService);

    registerGoogleAuth(dbService);
};
