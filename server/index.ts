/**
 * @notice This is the main entrypoint to the server
 */
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import * as swaggerUI from "swagger-ui-express";
import { RegisterRoutes } from "./build/routes";
import * as swaggerJson from "./build/swagger.json";
import { getDatabase } from "./clients/database";

export const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
RegisterRoutes(app);
app.use(
  ["/openapi", "/docs", "/swagger"],
  swaggerUI.serve,
  swaggerUI.setup(swaggerJson)
);
getDatabase();

const port = process.env.PORT || 9000;
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
