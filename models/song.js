import mongoose from "mongoose";

// define the schema for our song model
const songSchema = mongoose.Schema(
  {
    username: String,
    song: String,
    thumbUp: String,
  },
  { timestamps: true }
);

// create the model for songs and expose it to our app
export const Song = mongoose.model("Song", songSchema);
