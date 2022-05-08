import * as mongoose from "mongoose";
const { Schema } = mongoose;

export enum TodoStatus {
  DONE = "done",
  PENDING = "pending",
}

const todoSchema = new Schema({
  title: { type: String, minlength: 8 },
  description: String,
  status: {
    type: String,
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  },
});

export const todoModel = mongoose.model("Todo", todoSchema);
