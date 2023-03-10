import express, { Express } from "express";
import helmet from "helmet";
import xss from "xss-clean";
import ExpressMongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import httpStatus from "http-status";
import { ENVIRONMENT } from "./config/config";
import { morgan } from "@dripstore/common/build";
import {
  ApiError,
  errorConverter,
  errorHandler,
} from "@dripstore/common/build";
import routes from "./routes/v1";
import RabbitMQConsumer from "./modules/utils/RabbitMQConsumer";

const app: Express = express();

if (ENVIRONMENT !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// enable cors
app.use(cors());
app.options("*", cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

// v1 api routes
app.use("/", routes);

new RabbitMQConsumer(
  "amqp://default_user_uJAu0ttkJDvBBolxyPe:eDbrE5bOGGXMFsQh3LpmtLIDqcQzvB52@10.105.181.43",
  "product"
);

// send back a 404 error for any unknown api request
app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
