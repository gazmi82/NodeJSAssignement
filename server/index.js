"use strict";

const Hapi = require("@hapi/hapi");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const mongoose = require("mongoose");

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
      return user;
    },
  });

  // async function getUserToken(code) {
  //   const res = await fetch("https://github.com/login/oauth/access_token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       client_id,
  //       client_secret,
  //       code,
  //     }),
  //   });
  //   const data = await res.text();
  //   const params = new URLSearchParams(data);
  //   return params.get("access_token");
  // }

  async function fetchGitHubUser(token) {
    const request = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: "token " + token,
      },
    });
    return await request.json();
  }

  // callback
  // server.route({
  //   method: "GET",
  //   path: "/login/github/callback",

  //   handler: async (request, res) => {
  //     const code = request.query.code;
  //     const token = await getUserToken(code);
  //     const user = await fetchGitHubUser(token);

  //     if (user) {
  //       return user;
  //       // return res.redirect(`https://localhost:3000/profile`);

  //       return res.redirect(
  //         `https://api.github.com/users/${user.login}/starred`
  //       );
  //     }
  //   },
  // });

  await server.start();
  console.log("Server on port 5000");
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
