import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
    
  }
});

export const User = mongoose.model("User", UserSchema);
