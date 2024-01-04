const express = require("express");
const cors = require("cors");
const config = require("./config");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger");
const users = require("./routes/users");
const search = require("./routes/search");

const app = express();
app.use(cors());
app.use(express.json());
//swagger endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// users endpoint
app.use(config.basePath, users);
// search endpoint
app.use(config.basePath, search);
const server = app.listen(config.port);

module.exports = { app, server, swaggerDocs };
