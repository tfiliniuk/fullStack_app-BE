import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegisterInput, validateLoginInput } from "../utils/validations";
import keys from "../config/keys";
import passport from "passport";

import { UserModel, TodoModel } from "../models";


export const register = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // if(!isValid) {
    //   return res.status(400).json({
    //     message: "Fields are not filled"
    //   });
    // }
    UserModel.findOne({email: req.body.email}).then(user => {
      if(user) {
        return res.status(400).json({email: "Email already exists"});
      } else {
        const newUser = new UserModel({
          email: req.body.email,
          password: req.body.password,
          fullname: req.body.fullname
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          });
        });
      }
    });
  };



  export const login = (req, res) => {
    // const { errors, isValid } = validateLoginInput(req.body);
    //
    // if (!isValid) {
    //   return res.status(400).json({
    //     message: "Fields are not filled"
    //   });
    // }
    const { email, password } = req.body;
    UserModel.findOne({email}).then(user => {
      if(!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      bcrypt.compare(password, user.password).then(isMatch => {
        if(isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
            fullname: user.fullname
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
                user: user,
                token: "JWT " + token
              });
            }
          )
        } else {
          return res.status(400).json({passwordincorrect: "Password incorrect"})
        }
      })
    })
  };


export const test = async(req, res) => {
  await passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      res.json({
        message: "Hello " + user.name,
        user
      })
    } else {
      res.json({
        message: "No such user",
        err
      })
    }
  })(req, res)
};

export const getMe = (req, res) => {
  const id = req.user && req.user._id;
  UserModel.findById(id, (err, user) => {
    if (err || !user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    res.json(user).end();
  });
};

export const findUsers = (req, res) => {
  const query = req.query.query;
  UserModel.find()
    .or([
      { fullname: new RegExp(query, 'i') },
      { email: new RegExp(query, 'i') }
    ])
    .then((users) => res.json(users))
    .catch((err) => {
      return res.status(404).json({
        status: 'error',
        message: err
      });
    });
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  UserModel.findOneAndRemove({ _id: id })
    .then(user => {
      if (user) {
        res.json({
          message: `User ${user.fullname} deleted`
        });
      }
    })
    .catch(() => {
      res.json({
        message: `User not found`
      });
    });
};
