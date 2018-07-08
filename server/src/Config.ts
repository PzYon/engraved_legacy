export default {
    db:  {
        url: process.env.MONGODB_URI || "mongodb://localhost:27017/",
        name: "engraved",
        collections: {
            items: "items",
            keywords: "keywords",
            users: "users"
        }
    },
    apiPort: 3001
}