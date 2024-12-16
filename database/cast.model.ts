import mongoose from "mongoose";

const CastSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bio: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    year: { type: String, required: true },
  },
  { timestamps: true }
);

const Cast = mongoose.models.Cast || mongoose.model("Cast", CastSchema);
export default Cast;
