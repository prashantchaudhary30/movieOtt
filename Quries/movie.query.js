const MovieModel = require('../model/Movie.model')

class MovieQuries {
  async createMovie (userDetails) {
    const movie = new MovieModel(userDetails)
    return movie.save()
  }

  async getAllMovies (pageNumber, pageLimit) {
    return MovieModel.find({}).skip(pageNumber).limit(pageLimit).exec()
  }

  async searchMovies (query) {
    return MovieModel.find(query)
  }

  async updateMovie (movieId, updateFields) {
    return MovieModel.findByIdAndUpdate(movieId, updateFields)
  }

  async deleteMovie (movieId) {
    return MovieModel.deleteOne({ movieId })
  }
}

module.exports = new MovieQuries()
