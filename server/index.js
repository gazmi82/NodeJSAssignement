"use strict";

const Hapi = require("@hapi/hapi");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

// const clientId = "8166c53a1352db263e15";
// const clientSecret = "a6279f02c7e1b5a3ce291ee90fefa1c2a509d24e";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "<h3>Hiiiiiiii!</h3>";
    },
  });
  await server.start();
  console.log("Server running on port 5000");
};

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected");
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
