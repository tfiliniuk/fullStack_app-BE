import express from "express";
import * as UserCtrl from "../controllers/UserController";
import passport from "passport";
import jwt from "jsonwebtoken";

const requireAuth = passport.authenticate('local', { session: false });
const requireAuths = passport.authenticate('jwt', { session: false });

const router = express.Router();

router.get("/api/user/me", requireAuths, UserCtrl.getMe);
router.post("/api/users/signup", UserCtrl.register);
router.post("/api/users/login", requireAuth, UserCtrl.login);
router.get("/api/users", requireAuths, UserCtrl.test);
router.get("/api/user/find", requireAuths, UserCtrl.findUsers);
router.delete("/api/user/:id", requireAuths, UserCtrl.deleteUser);

export default router;
