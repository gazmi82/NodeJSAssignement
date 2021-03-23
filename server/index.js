"use strict";

const Hapi = require("@hapi/hapi");

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
  console.log("Server running");
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
