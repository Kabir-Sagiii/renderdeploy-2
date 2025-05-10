const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const User = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const secret_key = "vjdfvbkjdfvbjkfdvbkjfdbvkjfdbvjkfdbvfjdkvbjdkdxc";

route.post("/signup", (req, res) => {
  const newUser = req.body;

  const user = new User(newUser);

  //insert the data in mongodb
  user
    .save()
    .then(() => {
      res.send({ ok: true, result: "User Created" });
    })
    .catch((error) => {
      res.send({ ok: false, error: error });
    });
});
//http://localhost:9898/api/users/signup

route.get("/get-all-users", (req, res) => {
  User.find()
    .then((data) => {
      res.send({
        ok: true,
        length: data.length,
        result: data,
      });
    })
    .catch((error) => {
      res.send({
        ok: false,
        error: error,
      });
    });
});

//http://localhost:9898/api/users/get-all-users

route.post("/signin", (req, res) => {
  const userCredentials = req.body;

  User.findOne(userCredentials)
    .then((data) => {
      if (data) {
        jwt.sign(req.body, secret_key, (error, token) => {
          if (error) {
            res.send({ ok: false, error: "failed to create token" });
          } else {
            res.send({
              ok: true,
              result: "Valid User",
              data: data,
              token: token,
            });
          }
        });
      } else {
        throw Error("Invalid User, User is not registered");
      }
    })
    .catch((error) => {
      res.send({ ok: false, error: error.message });
    });
});
//http://localhost:9898/api/users/signin

module.exports = route;
