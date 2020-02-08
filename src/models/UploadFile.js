import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UploadFileSchema = new Schema({
  filename: String,
  size: Number,
  ext: String,
  url: String,
  message: {type: Schema.Types.ObjectId, ref: "Message", require: true},
  user: {type: Schema.Types.ObjectId, ref: "User", require: true}
}, {timestamps: true, versionKey: false});

const UploadFileModel = mongoose.model("UploadFile", UploadFileSchema);

export default UploadFileModel;
