import { ChallengeType, TaskType } from "@/types/type";
import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema<TaskType>({
  title: { type: String, required: true },
  description: String,
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
});

const ChallengeSchema = new Schema<ChallengeType>({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  tasks: [TaskSchema],
  completedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Challenge ||
  mongoose.model<ChallengeType>("Challenge", ChallengeSchema);
