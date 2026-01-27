import mongoose from "mongoose";

const DiscordUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  discordId: {         
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

export const DiscordUser = mongoose.model(
  "DiscordUser",
  DiscordUserSchema
);
