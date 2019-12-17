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
import { AppController } from "./controllers/AppController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { DevApiController } from "./controllers/DevApiControlller";
import { FileController } from "./controllers/FileController";
import { ItemController } from "./controllers/ItemController";
import { KeywordController } from "./controllers/KeywordController";
import { UserController } from "./controllers/UserController";

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

  new AuthenticationController(app, db);
  new ItemController(app, db);
  new FileController(app, db);
  new KeywordController(app, db);
  new UserController(app, db);
  new AppController(app, db);
  new DevApiController(app, db);

  if (isProd) {
    app.use(express.static(path.join(__dirname, "client")));
    app
      .route("*")
      .get((_, res: any) =>
        res.sendFile(path.join(__dirname, "client", "index.html"))
      );
  }

  console.log("Listening on port " + Config.webServer.apiPort);

  app.listen(Config.webServer.apiPort, () =>
    console.log(
      "-> Express up and running @ " + new Date().toLocaleTimeString()
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
