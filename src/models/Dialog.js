import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DialogSchema = new Schema({
  partner: { type: Schema.Types.ObjectId, ref: "User" },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  lastMessage: { type: Schema.Types.ObjectId, ref: "Message" }
}, {timestamps: true, versionKey: false});

const DialogModel = mongoose.model("Dialog", DialogSchema);

export default DialogModel;
