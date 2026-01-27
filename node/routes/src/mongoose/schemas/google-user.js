import mongoose from "mongoose";

const GoogleUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  googleId: {         
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {         
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

export const GoogleUser = mongoose.model(
  "GoogleUser",
   GoogleUserSchema
);
