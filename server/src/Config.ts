export default {
  db: {
    url: process.env.DB_URI,
    collections: {
      items: "items",
      keywords: "keywords",
      users: "users",
      files: "files"
    }
  },
  webServer: {
    apiPort: Number(process.env.PORT) || 3001,
    apiUrlPrefix: "/api"
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET,
    jwtIssuer: "pzyon",
    jwtAudience: "pzyon",
    jwtExpiration: "1 hour",
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // below URL must be configured under https://console.developers.google.com as "Authorized redirect URIs" for your app
    googleCallbackUrl: process.env.BASEURL_API + "/api/auth/google/callback",
    clientCallbackUrl: process.env.BASEURL_WEB + "/authenticated/"
  }
};
