"use strict";

const Hapi = require("@hapi/hapi");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
console.table([client_id, client_secret]);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("useCreateIndex", true);

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  // Home
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "<h1>Node Assignement Project</h1>";
    },
  });

  // Login
  server.route({
    method: "GET",
    path: "/login/oauth/authorize",
    handler: (request, h) => {
      return h.redirect(
        `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:5000/login/github/callback`
      );
    },
  });

  // callback
  server.route({
    method: "GET",
    path: "/login/github/callback",
    handler: (request, h) => {
      return "<h1>Callback!</h1>";
    },
  });
  await server.start();
  console.log("Server on port 5000");
};

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
