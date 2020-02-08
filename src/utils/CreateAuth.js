import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegisterInput, validateLoginInput } from "./validations";
import keys from "../config/keys";

import { UserModel, TodoModel } from "../models";

class CreateAuth {
  register(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
      return res.status(400).json({
        message: "Fields are not filled"
      });
    }

    UserModel.findOne({email: req.body.email}).then(user => {
      if(user) {
        return res.status(400).json({email: "Email already exists"});
      } else {
        const newUser = new UserModel({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              // .then(user => res.json(user))
              // .catch(err => console.log(err))
              .then(({name, email, _id}) => {
                jwt.sign(
                  {name, email, _id},
                  keys.secretOrKey,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({success: true, token: "Bearer " + token})
                  }
                )
              })
              .catch(err => console.log(err))
          });
        });
      }
    });
  };

  async userShow(req, res) {
    let user = await UserModel.findOne({email: req.body.email});
    const todos = await TodoModel.find({user});
    user = {email: user.email, _id: user._id};
    console.log({todos: todos, user: user});
    res.json({todos: todos, user: user});
  }

  login(req, res) {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        message: "Fields are not filled"
      });
    }

    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({email}).then(user => {
      if(!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      };

      bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
          const payload = {
            _id: user._id,
            email: user.email,
            name: user.name
          };

          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res.status(400).json({passwordincorrect: "Password incorrect"})
        }
      })
    })
  };
}

export default CreateAuth;
