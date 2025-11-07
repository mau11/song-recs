import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Song } from "./models/song.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_CONNECTION_STRING + "/" + process.env.DB_NAME;
let db;

// connect to DB and start server
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to db");

    db = mongoose.connection.db;

    // db.collection("messages").rename("songs"); // command to rename collection

    // start server
    app.listen(PORT, () => {
      console.log(`Listening at localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// get home page
app.get("/", async (req, res) => {
  try {
    const songs = await Song.find();

    res.render("index.ejs", { songs });
  } catch (err) {
    console.log(err);
  }
});

// add songs
app.post("/songs", async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      song: req.body.song,
      thumbUp: 0,
    };

    const newSong = new Song(data);
    await newSong.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// update thumbs up count
app.put("/songs", async (req, res) => {
  try {
    const { username, song, thumbUp, thumbDown } = req.body;

    const isUp = Object.keys(req.body).includes("thumbUp");
    const thumbValue = isUp ? thumbUp + 1 : thumbDown - 1;

    const updated = await Song.findOneAndUpdate(
      { username, song },
      {
        $set: {
          thumbUp: thumbValue,
        },
      },
      { new: true, upsert: false }
    );

    if (!updated) {
      return res.status(404).json({ success: false, song: "Song not found" });
    }

    res
      .status(200)
      .json({ success: true, song: "Updated successfully", data: updated });
  } catch (err) {
    console.error("PUT /songs error:", err);
    res.status(500).json({ success: false, song: "Server error" });
  }
});

// delete song
app.delete("/songs", async (req, res) => {
  try {
    await db.collection("songs").findOneAndDelete({
      username: req.body.username,
      song: req.body.song,
    });

    res.status(200).json({ success: true, song: "Song deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, song: "Error deleting" });
  }
});
