var passport = require("passport");
var settings = require("../config/settings");
require("../config/passport")(passport);
var express = require("express");
var jwt = require("jsonwebtoken");
var usuarioRoute = express.Router();
let UsuarioModel = require("../models/Usuario");

usuarioRoute.route("/crear-usuario").post((req, res, next) => {
  UsuarioModel.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});
usuarioRoute.get("/buscar-usuario/:id", function(req,res){
  UsuarioModel.findById(req.params.id, (error, data, next) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
    }
  });
});
usuarioRoute.route("/login").post(function(req, res) {
  UsuarioModel.findOne({email: req.body.email,},
    function(err, user) {
      if (err) throw err;
      if (!user) {
          console.log("Error, e-mail no registrado")
        res.status(401).send({
          success: false,
          msg: "Fallo la Autenticación. E-mail no Registrado." 
        });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            let token = jwt.sign(user.toJSON(), settings.secret);
            res.json({ success: true, token: "JWT " + token, id: user._id });
          } 
          else {
              console.log("Error, contraseña erronea")
            res.status(401).send({
              success: false,
              msg: "Password Erroneo"
            });
          }
        });
      }
    }
  );
});
module.exports = usuarioRoute;