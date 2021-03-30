"use strict";

const Hapi = require("@hapi/hapi");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const repoSchema = require("./Model/repos");
dotenv.config();

const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
console.table([client_id, client_secret]);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connected");
});

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
        headers: ["Accept", "Content-Type"],
        additionalHeaders: ["X-Requested-With"],
      },
    },
  });

  // Home
  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "<h1>Node Assignement Project 🎉</h1>";
    },
  });

  // Login
  //&redirect_uri=http://localhost:5000/login/github/callback
  server.route({
    method: "GET",
    path: "/login/oauth/authorize",
    handler: (request, h) => {
      return h.redirect(
        `https://github.com/login/oauth/authorize?client_id=${client_id}`
      );
    },
  });

  server.route({
    method: "GET",
    path: "/login/github/callback",

    handler: async (request, res) => {
      const code = request.query.code;

      const response = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id,
            client_secret,
            code,
          }),
        }
      );
      const data = await response.text();
      const params = new URLSearchParams(data);
      const token = params.get("access_token");
      const user = await fetchGitHubUser(token);
      handleData(user);
      return user;
    },
  });

  async function fetchGitHubUser(token) {
    const request = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: "token " + token,
      },
    });
    return await request.json();
  }

  async function fetchStaredRepos(user) {
    let uri = `https://api.github.com/users/${user}/starred`;
    const request = await fetch(uri);
    return await request.json();
  }

  server.route({
    method: "POST",
    path: "/login/github/callback",
    handler: (request, h) => {
      return handleData(h);
    },
  });

  async function handleData(rrep, request) {
    console.log("sended");
    let listOfStarredRepos = await fetchStaredRepos(rrep.login);
    let object = {
      name: rrep.name,
      html_url: rrep.url,
      stargazers_count: listOfStarredRepos,
    };

    repoSchema.create(object, function (err, newlyCreated) {
      if (err) {
        console.log(err);
      } else {
        console.log("ok");
      }
    });
  }

  await server.start();
  console.log("Server on port 5000");
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
