import { json } from "body-parser";
import compression from "compression";
import express, { Express } from "express";
import { Db, MongoClient } from "mongodb";
import * as path from "path";
import Config from "./Config";
import { AppController } from "./controllers/AppController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import { DevApiController } from "./controllers/DevApiControlller";
import { ItemController } from "./controllers/ItemController";
import { KeywordController } from "./controllers/KeywordController";
import { UserController } from "./controllers/UserController";

const configureDb = async (client: MongoClient) => {
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
};

const configureExpress = (db: Db) => {
  const app: Express = express();

  app.use(compression());
  app.use(json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
  });

  const authController = new AuthenticationController(app, db);
  const itemController = new ItemController(app, db);
  const keywordController = new KeywordController(app, db);
  const userController = new UserController(app, db);
  const appController = new AppController(app, db);
  const devApiController = new DevApiController(app, db);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client")));
    app
      .route("*")
      .get((req: any, res: any) =>
        res.sendFile(path.join(__dirname, "client", "index.html"))
      );
  }

  app.listen(Config.webServer.apiPort, () =>
    console.log("-> Express up and running")
  );
};

const bootstrap = async (client: MongoClient) => {
  console.log("Connected to mongoDB");

  const db = await configureDb(client);

  try {
    configureExpress(db);
  } catch (err) {
    console.log("Failed to configure express:");
    console.log(JSON.stringify(err));
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
