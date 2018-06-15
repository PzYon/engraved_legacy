import {json} from "body-parser";
import express, {Express} from "express";
import {Db, MongoClient} from "mongodb";
import Config from "./Config";
import {ApiController} from "./controllers/ApiController";
import {DevApiController} from "./controllers/DevApiControlller";

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
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
        next();
    });

    const apiController = new ApiController(app, db);
    const devApiController = new DevApiController(app, db);

    app.listen(Config.apiPort, () => console.log("- Express up and running"));
};

const bootstrap = async function (client: MongoClient) {
    console.log("- Connected to mongoDB");

    const db = await configureDb(client);

    configureExpress(db);
};

MongoClient.connect(Config.db.url).then(bootstrap);
