import express from "express";
import UploadController from "../controllers/UploadController";
import multer from "../core/multer";

import passport from "passport";

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

const createRoutesUpload = app => {
  const UploadCtrlr = new UploadController();

  app.post("/files", requireAuth, multer.single("file"), UploadCtrlr.create);
  app.delete("/files", UploadCtrlr.delete);

}

export default createRoutesUpload;
