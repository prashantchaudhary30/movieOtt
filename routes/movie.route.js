const movieController = require('../controllers/movie.controller')
const express = require('express')
const movieRoute = express.Router()
const { verifyToken, checkAdminRole } = require('../middlewares/movie.middleware')

movieRoute.get('/movie', movieController.getMovies)
movieRoute.get('/search', movieController.seachMovie)
movieRoute.put('/movies/:id', verifyToken, checkAdminRole, movieController.updateMovieDetails)
movieRoute.post('/createMovie', verifyToken, checkAdminRole, movieController.registerMovie)
movieRoute.delete('/movies/:id', verifyToken, checkAdminRole, movieController.deleteMovie)

module.exports = movieRoute
