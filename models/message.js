import mongoose from "mongoose";

// define the schema for our resume model
const messageSchema = mongoose.Schema(
  {
    username: String,
    message: String,
    thumbUp: String,
  },
  { timestamps: true }
);

// create the model for resumes and expose it to our app
export const Message = mongoose.model("Message", messageSchema);
