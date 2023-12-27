const UUID = require('uuid')
const utils = require('../utils/reponse')
const { STATUS_CODE } = require('../helpers/StatusCode')
const CONSTANT = require('../helpers/Constant')
const MovieQuries = require('../Quries/movie.query')

exports.registerMovie = async (req, res) => {
  try {
    const { title, ratings, genre, streamingLink, createdBy } = req.body
    const movieData = {
      _id: UUID.v4(),
      title,
      ratings,
      genre,
      streamingLink,
      createdBy
    }

    Object.assign(movieData, req.body)
    const movie = await MovieQuries.createMovie(movieData)

    return utils.sendResponse(
      res,
      STATUS_CODE.CREATED,
      CONSTANT.USER_CREATED_SUCCESSFULL,
      movie
    )
  } catch (error) {
    console.log('error in registerMovie', error)
    return utils.sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      CONSTANT.SOMETHING_WENT_WRONG,
      error
    )
  }
}

exports.getMovies = async (req, res) => {
  try {
    let { pageNumber, pageLimit } = req.query
    pageNumber = parseInt(pageNumber)
    pageLimit = parseInt(pageLimit)

    const movies = await MovieQuries.getAllMovies(pageNumber, pageLimit)
    return utils.sendResponse(
      res,
      STATUS_CODE.OK,
      CONSTANT.Response.FETCH_SUCCESS,
      movies
    )
  } catch (error) {
    console.log('error in getMovies', error)
    return utils.sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      CONSTANT.SOMETHING_WENT_WRONG,
      error
    )
  }
}

exports.seachMovie = async (req, res) => {
  try {
    let { title, genre } = req.query
    const query = {}
    if (title) query.title = { $regex: new RegExp(title, 'i') }
    if (genre) {
      genre = Array.isArray(genre) ? genre : [genre]
      query.genre = { $elemMatch: { $regex: new RegExp(genre, 'i') } }
    }

    const movies = await MovieQuries.searchMovies(query)
    return utils.sendResponse(
      res,
      STATUS_CODE.OK,
      CONSTANT.Response.FETCH_SUCCESS,
      movies
    )
  } catch (error) {
    console.log('error in seachMovie', error)
    return utils.sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      CONSTANT.SOMETHING_WENT_WRONG,
      error
    )
  }
}

exports.updateMovieDetails = async (req, res) => {
  try {
    const movieId = req.params.id

    const { title, genre, ratings, streamingLink } = req.body

    const updateFields = {}
    if (title) {
      updateFields.title = title
    }

    if (genre) {
      updateFields.genre = genre
    }

    if (ratings) {
      updateFields.ratings = ratings
    }

    if (streamingLink) {
      updateFields.streamingLink = streamingLink
    }

    await MovieQuries.updateMovie(movieId, updateFields)
    return utils.sendResponse(
      res,
      STATUS_CODE.OK,
      CONSTANT.Response.MOVIE_UPDATE
    )
  } catch (error) {
    console.log('error in updateMovieDetails', error)
    return utils.sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      CONSTANT.SOMETHING_WENT_WRONG,
      error
    )
  }
}

exports.deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id

    await MovieQuries.deleteMovie(movieId)
    return utils.sendResponse(
      res,
      STATUS_CODE.OK,
      CONSTANT.Response.MOVIE_DELETE
    )
  } catch (error) {
    console.log('error in deleteMovie', error)
    return utils.sendResponse(
      res,
      STATUS_CODE.BAD_REQUEST,
      CONSTANT.SOMETHING_WENT_WRONG,
      error
    )
  }
}
