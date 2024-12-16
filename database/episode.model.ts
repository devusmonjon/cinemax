import mongoose from "mongoose";

const EpisodeSchema = new mongoose.Schema(
  {
    series_id: {
      ref: "Series",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    season_id: {
      ref: "Season",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    cover: { type: String, required: true },
    trailer: { type: String, required: true },
    rating: { type: Number, default: 0 },
    imdb_rating: { type: Number, default: 0 },
    year: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Episode =
  mongoose.models.Episode || mongoose.model("Episode", EpisodeSchema);
export default Episode;
