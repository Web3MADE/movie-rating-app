import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    // This is necessary because next.js forces { "jsx": "preserve" }
    "^.+\\.[jt]sx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react-jsx",
        },
      },
    ],
  },
};

export default config;
