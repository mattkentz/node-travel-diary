const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    local            : {
        email        : { type: String, required: true, index: { unique: true } },
        password     : { type: String, required: true }
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

UserSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('local.password'))
    return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err)
      return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.local.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.local.password = hash;
        next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {
        if (err)
          return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);