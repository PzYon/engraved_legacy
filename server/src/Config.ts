export default {
    db: {
        url: process.env.MONGODB_URI || "mongodb://localhost:27017/engraved",
        collections: {
            items: "items",
            keywords: "keywords",
            users: "users"
        }
    },
    webServer: {
        apiPort: Number(process.env.PORT) || 3001,
        apiUrlPrefix: "/api"
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || "schwiiiiiizerNati18",
        jwtIssuer: "pzyon",
        jwtAudience: "pzyon",
        jwtExpiration: "1 hour",
        googleClientId: process.env.GOOGLE_CLIENT_ID || "576425839117-jhd1i2tf90njb0oh2m9i5tsdbpc6t7up.apps.googleusercontent.com",
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "5rmj2eQO_1kr4eh6LScq2nsG",
        // below URL must be configured under https://console.developers.google.com as "Authorized redirect URIs" for your app
        googleCallbackUrl: (process.env.BASEURL_API || "http://localhost:3001") + "/api/auth/google/callback",
        clientCallbackUrl: (process.env.BASEURL_WEB || "http://localhost:3000") + "/authenticated/"
    }
}