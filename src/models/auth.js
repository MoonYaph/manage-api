import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    confirmationToken: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

userSchema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};
userSchema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};
userSchema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      username: this.username,
    },
    process.env.JWT,
  );
};

userSchema.methods.toAuthJSON = function toAuthJSON() {
  return {
    username: this.username,
    token: this.generateJWT(),
  };
};
userSchema.methods.setConfirmationToken = function setConfirmationToken() {
  this.confirmationToken = this.generateJWT();
};
userSchema.plugin(uniqueValidator, { message: 'The username has been token' });

export default mongoose.model('User', userSchema);
