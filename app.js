const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const session = require("express-session");
const request = require("request-promise");

const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", require("./routes/builders"));
app.use("/", require("./routes/sets"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  session({
    secret: "your_secret_here",
    resave: false,
    saveUninitialized: true,
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
