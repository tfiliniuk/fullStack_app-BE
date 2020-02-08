import express from "express";

import { TodoModel, UserModel } from "../models";
import passport from "passport";

export const fetchTodos = (req, res, next) => {
  TodoModel.find({user: req.user._id})
    .then(response => {
      res.json(response);
    })
    .catch(err => next(err));
}

export const saveTodo = (req, res, next) => {
  const task = req.body.task;
  if(!task) {
    res.status(400).json({"error": "Invalid Data"})
  }
  const todo = new TodoModel({
    task: task,
    user: req.user._id
  });
  todo.save()
  .then(item => {
    res.status(200).json(item);
  })
  .catch(err => {
    res.status(400).send("unable to save to database");
  });
};

export const editTodo = (req, res, next) => {
  TodoModel.findOne({_id: req.params.id}, (err, todo) => {
    if(err) res.json(err);
    if (todo) {
      if (typeof req.body['completed'] !== "undefined") {
        todo.completed = !todo.completed;
      }
      if (typeof req.body['important'] !== "undefined") {
        todo.important = !todo.important;
      }
      if (typeof req.body['date'] !== "undefined") {
        todo.date = req.body.date;
      }
      if (typeof req.body['category'] !== "undefined") {
        todo.category = req.body.category;
      }
      if (typeof req.body['task'] !== "undefined") {
        todo.task = req.body.task;
      }

      todo.save();
      res.json(todo);
    }
  });
};

export const deleteTodo = (req, res, next) => {
  TodoModel.findByIdAndRemove({_id: req.params.id}, (err, todo) => {
    if(err) res.json(err);
    else res.json(req.params.id)
  })
}
// class TodoController {
//   getAll(req, res) {
//      TodoModel.find((err, todos) => {
//        if(err) {
//          console.log(err)
//        } else {
//          res.json(todos)
//        }
//      });
//    };
//
//   get(req, res, next) {
//      TodoModel.findById(req.params.id, (err, todo) => {
//         if (err) {
//           return res.status(404).json({
//             message: "Task not found"
//           })
//         }
//         return res.json(todo)
//      });
//   };
//
//   post(req, res)  {
//     console.log(req.body)
//     let todo = new TodoModel(req.body);
//     todo.save()
//       .then(item => {
//         res.status(200).json(item);
//       })
//       .catch(err => {
//         res.status(400).send("unable to save to database");
//       });
//   };
//
//
//   put(req, res)  {
//
//      TodoModel.findOne({_id: req.params.id}, (err, todo) => {
//           if(err) res.json(err);
//           if (todo) {
//             if (typeof req.body['completed'] !== "undefined") {
//               todo.completed = !todo.completed;
//             }
//             if (typeof req.body['important'] !== "undefined") {
//               todo.important = !todo.important;
//             }
//             if (typeof req.body['date'] !== "undefined") {
//               todo.date = req.body.date;
//             }
//             if (typeof req.body['category'] !== "undefined") {
//               todo.category = req.body.category;
//             }
//             if (typeof req.body['task'] !== "undefined") {
//               todo.task = req.body.task;
//             }
//
//             todo.save();
//             res.json(todo);
//           }
//      });
//   };
//
//   delete(req, res)  {
//       TodoModel.findByIdAndRemove({_id: req.params.id}, (err, todo) => {
//         if(err) res.json(err);
//         else res.json(req.params.id)
//       })
//     };
//   }
//
//
// export default TodoController;
