import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Message } from "./models/message.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const DB_URL = process.env.DB_CONNECTION_STRING + "/" + process.env.DB_NAME;
let db;

// connect to DB and start server
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to db");

    db = mongoose.connection.db;

    // start server
    app.listen(PORT, () => {
      console.log(`Listening at localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ thumbUp: -1 });

    res.render("index.ejs", { messages });
  } catch (err) {
    console.log(err);
  }
});

app.post("/messages", async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      message: req.body.message,
      thumbUp: 0,
    };

    const newMessage = new Message(data);
    await newMessage.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

app.put("/messages", async (req, res) => {
  try {
    const { username, message, thumbUp, thumbDown } = req.body;

    const isUp = Object.keys(req.body).includes("thumbUp");
    const thumbValue = isUp ? thumbUp + 1 : thumbDown - 1;

    const updated = await Message.findOneAndUpdate(
      { username, message },
      {
        $set: {
          thumbUp: thumbValue,
        },
      },
      { new: true, upsert: false }
    );

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Updated successfully", data: updated });
  } catch (err) {
    console.error("PUT /messages error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.delete("/messages", async (req, res) => {
  try {
    await db.collection("messages").findOneAndDelete({
      username: req.body.username,
      message: req.body.message,
    });

    res.status(200).json({ success: true, message: "Message deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting" });
  }
});
