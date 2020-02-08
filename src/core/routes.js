import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import passport from "passport";

import { passportConfig } from "../config";

import { upload } from "../utils";

import { TodoCtrl, FileCtrl, Emails } from "../controllers";
import { CreateAuth } from "../utils";

const createRoutes = (app) => {
  const TodoController = new TodoCtrl();
  const FileController = new FileCtrl();
  const EmailsCont = new Emails();
  const CreateAuthController = new CreateAuth();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: false
  }));
  app.use(cors());
  app.use(passport.initialize());

  passportConfig(passport);
  app.get("/api/todos/:id", TodoController.get);
  app.get("/api/todos", TodoController.getAll);
  app.put("/api/todos/:id", TodoController.put);
  app.delete("/api/todos/:id", TodoController.delete);
  app.post("/api/todos", passport.authenticate("jwt", { session: false }), TodoController.post)

  app.post("/uploadfile", upload.single("myFile"), FileController.postOneFile);
  app.post("/uploadmultiple", upload.array("myFiles", 12), FileController.postManyFile);
  app.post("/uploadphoto", upload.single("profileImg"), FileController.uploadFile);
  app.get("/uploadphoto", upload.single("profileImg"), FileController.getImage);

  app.post("/api/users/signup", CreateAuthController.register);
  app.post("/api/users/login", CreateAuthController.login);
  app.get("/api/users/:username", passport.authenticate("jwt", {session: true}), CreateAuthController.userShow);

  app.post("/email", EmailsCont.createEmail);

  app.get("/api", (req, res, next) => {
     next({status: 404, message: "API not found"});
  });
}

export default createRoutes;
