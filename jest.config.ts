import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
};

export default config;
