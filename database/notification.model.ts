import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user_id: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    image: { type: String, default: null },
    url: { type: String, required: true },
    isViewed: { type: Boolean, default: false },
    viewedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
export default Notification;
