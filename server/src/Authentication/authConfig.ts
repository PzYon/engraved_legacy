export const authConfig = {
    jwtSecret: process.env.JWT_SECRET || "schwiiiiiizerNati18",
    jwtIssuer: "pzyon",
    jwtAudience: "pzyon",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "576425839117-jhd1i2tf90njb0oh2m9i5tsdbpc6t7up.apps.googleusercontent.com",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "5rmj2eQO_1kr4eh6LScq2nsG",
    googleCallbackUrl: "http://localhost:3001/auth/google/callback",
    clientCallbackUrl: "http://localhost:3000/authenticated/"
};