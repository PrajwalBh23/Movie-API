const express = require('express');
const router = express.Router();

/**Here the function is importing name :- listMovies */
const moviecontroller = require('../controller/movieController');  



/**
 * APP Routes
 */
router.get('/api/movies/',moviecontroller.listMovies);   /* when the /api/movies/ * call then function called listMovies in moviecontroller.js run */
router.post('/api/movies/',moviecontroller.insertSingleMovies);
router.patch('/api/movies/:id',moviecontroller.UpdateSingleMovies);
router.delete('/api/movies/:id',moviecontroller.DelectSingleMovies);



module.exports = router;