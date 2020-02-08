import express from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import socketIO from "socket.io";
import { createServer } from 'http';

import createSocket from './core/socket';

import connect from "./core/db";
import { passportConfig } from "./config";
import {
  todoRouter,
  userRouter,
  emailRouter,
  createRoutesMessage,
  createRoutesDialog,
  createRoutesUpload
 } from "./routes";
const app = express();

const http = createServer(app);
const io = createSocket(http);

app.use(cors());
// app.use( (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.use('/uploads', express.static('uploads'));
dotenv.config();
app.use(cookieParser());
app.use(passport.initialize());


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/', todoRouter);
app.use('/', userRouter);
// app.use('/', emailRouter);

createRoutesMessage(app, io);
createRoutesDialog(app, io);
createRoutesUpload(app);

app.get("/api", (req, res, next) => {
   next({status: 404, message: "API not found"});
});

const port = process.env.PORT || 4000;
http.listen(port, function() {
  console.log('Server starts on ' + port)
});
