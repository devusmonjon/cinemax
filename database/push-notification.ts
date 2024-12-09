import mongoose from "mongoose";

const pushNotificationSchema = new mongoose.Schema(
  {
    user_id: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    allowed: {
      type: Boolean,
      default: true,
    },
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const PushNotification =
  mongoose.models.PushNotification ||
  mongoose.model("PushNotification", pushNotificationSchema);
export default PushNotification;
