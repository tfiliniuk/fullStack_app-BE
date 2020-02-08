import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: {
    type: String
  },
  dialog: {
    type: Schema.Types.ObjectId,
    ref: "Dialog"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', require: true
  },
  readed: {
      type: Boolean,
      default: false,
    },
  attachments: [{ type: Schema.Types.ObjectId, ref: 'UploadFile' }],
}, {timestamps: true, versionKey: false, usePushEach: true});

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;
