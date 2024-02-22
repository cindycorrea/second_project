const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const { auth, requiresAuth } = require("express-openid-connect");

const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.CLIENT_SECRET,
  baseURL: "http://localhost:3000",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: "https://dev-rvj64s07evwos7pn.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.use(bodyParser.json());
app.use("/", require("./routes/builders"));
app.use("/", require("./routes/sets"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
