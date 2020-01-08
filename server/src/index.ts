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
import { registerAppRoutes } from "./routes/registerAppRoutes";
import { registerAuthRoutes } from "./routes/registerAuthRoutes";
import { registerFileRoutes } from "./routes/registerFileRoutes";
import { registerItemRoutes } from "./routes/registerItemRoutes";
import { registerKeywordRoutes } from "./routes/registerKeywordRoutes";
import { registerUserRoutes } from "./routes/registerUserRoutes";
import { logRoute } from "./routes/routerHelpers";
import { ServiceFactory } from "./services/ServiceFactory";

bootstrap()
  .then()
  .catch(err => {
    console.log("Failed to bootstrap engraved API:");
    console.log(err.toString());
    console.log(JSON.stringify(err));
  });

async function bootstrap(): Promise<void> {
  const db = await setupDatabase();

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

  console.log("Registering routes:");

  registerAuthRoutes(app, db);

  app.use((req, _, next) => {
    logRoute(req.method, req.url, "Calling ");
    (req as IRequest).serviceFactory = new ServiceFactory(db, req);
    next();
  });

  registerItemRoutes(app);
  registerKeywordRoutes(app);
  registerUserRoutes(app);
  registerAppRoutes(app);
  registerFileRoutes(app);

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
}

async function setupDatabase(): Promise<Db> {
  try {
    console.log("Connecting to DB " + Config.db.url + "...");

    const client = await MongoClient.connect(Config.db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to DB");

    const db: Db = client.db();
    db.on("error", console.log);

    await db
      .collection(Config.db.collections.items)
      .createIndex({ "$**": "text" });

    return db;
  } catch (e) {
    console.error("DB failure: " + e.message);
    throw e;
  }
}
