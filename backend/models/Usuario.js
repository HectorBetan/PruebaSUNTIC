const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
let usuarioSchema = new Schema({
   nombre: {
      type: String,
   },
   apellidos: {
      type: String,
   },
   tipoid: {
      type: String,
   },
   numeroid: {
      type: Number,
   },
   telefono: {
      type: Number,
   },
   email: {
      type: String,
   },
   password: {
      type: String,
   },
   },
   {
      collection: "usuarios",
   }
);

usuarioSchema.pre("save", function(next) {
   var user = this;
   if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function(err, salt) {
         if (err) {
            return next(err);
         }
         bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) {
               return next(err);
            }
            user.password = hash;
            next();
         });
      });
   } 
   else {
      return next();
   }
});
usuarioSchema.methods.comparePassword = function(passw, cb) {
   bcrypt.compare(passw, this.password, function(err, isMatch) {
      if (err) {
         return cb(err);
      }
      cb(null, isMatch);
   });
};
module.exports = mongoose.model("Usuario", usuarioSchema);
