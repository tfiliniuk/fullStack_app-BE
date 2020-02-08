import express from "express";
import DialogController from "../controllers/DialogController";
import socket from "socket.io";
import passport from "passport";

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

const createRoutesDialog = (app, io) => {
  const DialogCtrlr = new DialogController(io);

  app.get("/dialogs", requireAuth, DialogCtrlr.index);
  app.delete("/dialogs/:id", requireAuth, DialogCtrlr.delete);
  app.post("/dialogs", requireAuth, DialogCtrlr.create);
}

export default createRoutesDialog;
