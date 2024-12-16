import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Genre = mongoose.models.Genre || mongoose.model("Genre", GenreSchema);
export default Genre;
