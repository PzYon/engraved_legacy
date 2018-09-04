const fs = require("fs");
const filePath = "./package.json";

const packageJson = JSON.parse(fs.readFileSync(filePath).toString());
packageJson.ngrvd.buildDate = new Date().toUTCString();

fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
