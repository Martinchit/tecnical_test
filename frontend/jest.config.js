module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "((\\.|/*.)(test))(\\.ts|.tsx)?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "serviceWorker.ts",
    "setupTests.ts",
    "index.tsx",
    "react-app-env.d.ts"
  ],
  "collectCoverageFrom": [
    "src/**/*.{ts,tsx}",
    "!serviceWorker.js"
  ],
  "snapshotSerializers": ["enzyme-to-json/serializer"],
  "setupFilesAfterEnv": ["<rootDir>/setupEnzyme.ts"],
}