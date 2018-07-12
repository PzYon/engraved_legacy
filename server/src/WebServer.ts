import {json} from "body-parser";
import express, {Express} from "express";
import {Db, MongoClient} from "mongodb";
import * as path from "path";
import {bootstrapAuthentication} from "./authentication/bootstrapAuthentication";
import Config from "./Config";
import {DevApiController} from "./controllers/DevApiControlller";
import {ItemController} from "./controllers/ItemController";
import {KeywordController} from "./controllers/KeywordController";
import {UserController} from "./controllers/UserController";
import {DbService} from "./db/DbService";

const configureDb = async function (client: MongoClient) {
    try {
        console.log("- Configuring DB...");

        const db: Db = client.db();
        db.on("error", console.log);

        await db.collection(Config.db.collections.items).createIndex({"$**": "text"});

        console.log("- Configured DB");

        return db;
    } catch (err) {
        console.log("- Error while configuring DB:");
        console.dirxml(err);
    }
};

const configureExpress = function (db: Db) {
    console.log("bootstrapping expresss");

    const app: Express = express();

    app.use(json());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH");
        next();
    });

    console.log("bootstrapping auth");

    bootstrapAuthentication(app, new DbService(db, null));

    console.log("bootstrapping controllers");

    const itemController = new ItemController(app, db);
    const keywordController = new KeywordController(app, db);
    const userController = new UserController(app, db);
    const devApiController = new DevApiController(app, db);

    if (process.env.NODE_ENV === "production") {
        console.log("bootstrapping static server");

        app.use(express.static(path.join(__dirname, "client")));
        app.get("*", (req: any, res: any) => res.sendFile(path.join(__dirname, "client", "index.html")));
    }

    console.log("bootstrapping expresss");

    app.listen(Config.apiPort, () => console.log("- Express up and running"));
};

const bootstrap = async function (client: MongoClient) {
    console.log("- Connected to mongoDB");

    const db = await configureDb(client);

    try {
        configureExpress(db);
    } catch (err) {
        console.log("Failed to configure express:");
        console.log(JSON.stringify(err));
    }
};

console.log("Connecting to mongoDB: " + Config.db.url);

MongoClient.connect(Config.db.url)
           .then(bootstrap)
           .catch(e => {
               console.log("Failed to bootstrap the app:");
               console.log(JSON.stringify(e));
           });
