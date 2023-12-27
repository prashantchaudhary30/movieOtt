const mongoose = require('mongoose')
const { Schema } = mongoose

const MovieSchema = new Schema(
  {
    _id: String,
    title: {
      type: String,
      required: true
    },
    genre: {
      type: [String],
      required: true
    },
    language: {
      type: Array
    },
    duration: {
      type: String
    },
    releaseYear: {
      type: Number
    },
    director: {
      type: String
    },
    cast: {
      type: [String]
    },
    description: {
      type: String
    },
    posterUrl: {
      type: String
    },
    trailerUrl: {
      type: String
    },
    streamingLink: {
      type: String,
      required: true
    },
    ratings: {
      type: Number,
      min: 0,
      max: 10,
      required: true
    },
    reviews: [
      {
        username: String,
        text: String
      }
    ],
    createdBy: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: '_created_at',
      updatedAt: '_updated_at'
    },
    versionKey: false
  }
)

const Movies = mongoose.model('Movies', MovieSchema, 'Movies')
module.exports = Movies
