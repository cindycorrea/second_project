const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/", require("./routes/builders"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
