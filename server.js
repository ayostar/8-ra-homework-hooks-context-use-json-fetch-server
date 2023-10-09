const http = require("http");
const path = require("path");
const Koa = require("koa");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const koaStatic = require("koa-static");
const Router = require("koa-router");

const app = new Koa();

app.use(
  cors({
    origin: "*",
    credentials: true,
    "Access-Control-Allow-Origin": true,
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(
  koaBody({
    text: true,
    urlencoded: true,
    multipart: true,
    json: true,
  })
);

const dirPublic = path.join(__dirname, "/public");
app.use(koaStatic(dirPublic));

const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

router.get("/data", async (ctx) => {
  ctx.response.body = { status: "ok" };
});

router.get("/error", async (ctx) => {
  ctx.response.status = 500;
  ctx.response.body = { status: "Internal Error" };
});

router.get("/loading", async (ctx) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
  ctx.response.body = { status: "ok" };
});

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

// eslint-disable-next-line no-console
server.listen(port, () => console.log("Server started"));

///////---------------------------------------------------------------------------------
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";

// const app = express();

// app.use(cors());
// app.use(
//   bodyParser.json({
//     type(req) {
//       return true;
//     },
//   })
// );
// app.use(function (req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   next();
// });

// app.get("/data", async (req, res) => {
//   res.send(JSON.stringify({ status: "ok" }));
// });
// app.get("/error", async (req, res) => {
//   res.status(500).send(JSON.stringify({ status: "Internal Error" }));
// });
// app.get("/loading", async (req, res) => {
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 5000);
//   });
//   res.send(JSON.stringify({ status: "ok" }));
// });

// const port = process.env.PORT || 7070;
// app.listen(port, () => console.log(`The server is running on port ${port}.`));
// ``;
