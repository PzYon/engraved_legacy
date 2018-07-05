import {json} from "body-parser";
import express, {Express} from "express";
import {Db, MongoClient} from "mongodb";
import {bootstrapAuthentication} from "./authentication/bootstrapAuthentication";
import Config from "./Config";
import {DevApiController} from "./controllers/DevApiControlller";
import {ItemController} from "./controllers/ItemController";
import {KeywordController} from "./controllers/KeywordController";
import {UserController} from "./controllers/UserController";
import {DbService} from "./db/DbService";

const configureDb = async function (client: MongoClient) {
    const db: Db = client.db(Config.db.name);
    db.on("error", console.log);

    await db.collection(Config.db.collections.items).createIndex({"$**": "text"});

    return db;
};

const configureExpress = function (db: Db) {
    const app: Express = express();

    app.use(json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
        next();
    });

    bootstrapAuthentication(app, new DbService(db, null));

    const itemController = new ItemController(app, db);
    const keywordController = new KeywordController(app, db);
    const userController = new UserController(app, db);
    const devApiController = new DevApiController(app, db);

    app.listen(Config.apiPort, () => console.log("- Express up and running"));
};

const bootstrap = async function (client: MongoClient) {
    console.log("- Connected to mongoDB");

    const db = await configureDb(client);

    configureExpress(db);
};

MongoClient.connect(Config.db.url)
           .then(bootstrap);
