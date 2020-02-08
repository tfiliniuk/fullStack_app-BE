import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  important: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: "To Do"
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users"
  }
}, {versionKey: false});

const TodoModel = mongoose.model("Todo", TodoSchema);

export default TodoModel;
