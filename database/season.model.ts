import mongoose from "mongoose";

const SeasonSchema = new mongoose.Schema(
  {
    series_id: {
      ref: "Series",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    trailer: { type: String, required: true },
    poster: { type: String, required: true },
    cover: { type: String, required: true },
    year: { type: String, required: true },
  },
  { timestamps: true }
);

const Season = mongoose.models.Season || mongoose.model("Season", SeasonSchema);
export default Season;
