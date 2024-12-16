import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    poster: { type: String, required: true },
    cover: { type: String, required: true },
    trailer: { type: String, required: true },
    video: { type: String, required: true },
    cast: [
      {
        _id: {
          ref: "Cast",
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
      },
    ],
    genres: [
      {
        _id: {
          ref: "Genre",
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
      },
    ],
    rating: { type: Number, default: 0 },
    imdb_rating: { type: Number, default: 0 },
    year: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
export default Movie;
