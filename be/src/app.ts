// BaseDir = __dirname;
import express, { Application } from "express";
import http from "http";
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { API_PATH } from "./constant";
import modules from "./modules";
import { dataSource } from "./database";
import { HTTPErrorMiddleware } from "./middlewares/errors";
import { BaseError } from "./middlewares/errors/BaseError";
import { ErrorCode } from "./enum";

const app: Application = express();
const server: http.Server = http.createServer(app);

// Setting the port
const port = Number(config.PORT);

const onSever = async (p: number): Promise<void> => {
  try {
    await dataSource.initialize();

    app.use(cors());
    app.use(bodyParser.json());

    /* define routes */
    app.use(modules);

    // handle errors not found
    // app.get("*", HTTPErrorMiddleware.handleErrorNotFound);

    //handle error
    app.use(HTTPErrorMiddleware.handleError);

    server.listen(p, () => {
      console.log(`SERVER RUNNING ON ${p}`);
    });
  } catch (error) {
    console.error("---aaaaa", error);
    process.exit(1);
  }
};

onSever(port);

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", function onSigint() {
  console.log(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.log(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
});

// process unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});
