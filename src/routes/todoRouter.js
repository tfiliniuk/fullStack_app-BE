import express from "express";

import passport from "passport";

import * as TodoCtrl from "../controllers/TodoController";

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/api/todos', requireAuth, TodoCtrl.fetchTodos);
router.post('/api/todos', requireAuth, TodoCtrl.saveTodo);
router.put('/api/todos/:id', requireAuth, TodoCtrl.editTodo);
router.delete('/api/todos/:id', requireAuth, TodoCtrl.deleteTodo);

export default router;
