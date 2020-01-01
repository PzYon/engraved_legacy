const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  require("dotenv").config();
}

import { json } from "body-parser";
import compression from "compression";
import express, { Express } from "express";
import { Db, MongoClient } from "mongodb";
import * as path from "path";
import Config from "./Config";
import { IRequest } from "./IRequest";
import { DevApiController } from "./routes/DevApiControlller";
import { registerAppRoutes } from "./routes/registerAppRoutes";
import { registerAuthRoutes } from "./routes/registerAuthRoutes";
import { registerFileRoutes } from "./routes/registerFileRoutes";
import { registerItemRoutes } from "./routes/registerItemRoutes";
import { registerKeywordRoutes } from "./routes/registerKeywordRoutes";
import { registerUserRoutes } from "./routes/registerUserRoutes";
import { ServiceFactory } from "./services/ServiceFactory";

const configureDb = async (client: MongoClient): Promise<Db> => {
  try {
    const db: Db = client.db();
    db.on("error", console.log);

    await db
      .collection(Config.db.collections.items)
      .createIndex({ "$**": "text" });

    return db;
  } catch (err) {
    console.log("Error while configuring DB: " + err);
  }

  return Promise.resolve(null);
};

const configureExpress = (db: Db) => {
  const app: Express = express();

  app.use(compression());
  app.use(json());

  app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

  registerAuthRoutes(app, db);

  app.use((req, _, next) => {
    (req as IRequest).serviceFactory = new ServiceFactory(db, req);
    next();
  });

  registerItemRoutes(app);
  registerKeywordRoutes(app);
  registerUserRoutes(app);
  registerAppRoutes(app);
  registerFileRoutes(app);

  new DevApiController(app, db);

  if (isProd) {
    app.use(express.static(path.join(__dirname, "client")));
    app
      .route("*")
      .get((_, res: any) =>
        res.sendFile(path.join(__dirname, "client", "index.html"))
      );
  }

  app.listen(Config.webServer.apiPort, () =>
    console.log(
      `-> engraved API up and running on port ${
        Config.webServer.apiPort
      } @ ${new Date().toLocaleTimeString()}`
    )
  );
};

const bootstrap = async (client: MongoClient) => {
  console.log("Connected to mongoDB");

  const db = await configureDb(client);

  try {
    configureExpress(db);
  } catch (err) {
    console.log("Failed to configure express:");
    console.log(err.toString());
  }
};

console.log("Connecting to mongoDB: " + Config.db.url);

MongoClient.connect(Config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(bootstrap)
  .catch(e => {
    console.log("Failed to bootstrap the app:");
    console.log(JSON.stringify(e));
  });
