import express from "express";
import MessageController from "../controllers/MessageController";
import socket from "socket.io";
import passport from "passport";

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

const createRoutesMessage = (app, io) => {
  const MessageCtrlr = new MessageController(io);

  app.get("/messages", requireAuth, MessageCtrlr.index);
  app.post("/messages", requireAuth, MessageCtrlr.create);
  app.delete("/messages", requireAuth, MessageCtrlr.delete);
}

export default createRoutesMessage;
