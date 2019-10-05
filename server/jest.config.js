module.exports = {
  preset: "@shelf/jest-mongodb",
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
