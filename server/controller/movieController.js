require('../models/db');
const Movie = require('../models/movie');


/**
 * /api/movies/
 * Get all Movies
*/


/**Here the function is exporting name :- listMovies */
exports.listMovies = async (req, res) => {

    console.log(req.query);
    // if the limit value is not defined then take 10 byDefault
    let {limit = 10, page = 1, category, q } = req.query;

    const limitRecords = parseInt(limit); /*Here the page is used to next pair * should come to display*/
    const skip = (page - 1) * limit;

    let query ={};
    if(category) query.category = category;
    if(q){
        query = { $text :{$search: q}};
    }


    try{
        const movies = await Movie.find(query).limit(limitRecords).skip(skip);
        res.json({page:page, limit:limitRecords, movies});
        // here the limit is given for defined length of movie in index.html file

    }catch (error){
        res.status(400).json({message :error})
    }

}


/**
 * /api/movies/
 * POST Movies
*/

exports.insertSingleMovies = async (req, res) => {
    const newMovie = new Movie({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
    })

    try{
        await newMovie.save();
        res.json(newMovie)
    }
    catch(error){
        res.status(400).json({message :error})
    }
}

/**
 * /api/movies/
 * Update Movies
*/

exports.UpdateSingleMovies = async (req, res) => {
    
    let paramID = req.params.id;
    let name = req.body.name;
    let thumbnail = req.body.thumbnail;


    try{
        const updateMovie = await Movie.updateOne({_id:paramID}, {thumbnail:thumbnail});
        res.json(updateMovie)
    }
    catch(error){
        res.status(400).json({message :error})
    }
}

/**
 * /api/movies/
 * Delect Movies
*/

exports.DelectSingleMovies = async (req, res) => {
    
    let paramID = req.params.id;
    
    try{
        const delectMovie = await Movie.deleteOne({_id:paramID});
        res.json(data)
    }
    catch(error){
        res.status(400).json({message :error})
    }
}

// async function insertMovies() {
//     try {
//         await Movie.insertMany([
//             {
//                 "name": "Cartel",
//                 "description": "The action-drama series, Cartel revolves around 5 gang-lords of Mumbai. Khan, Anna, Angre, Gajraj and a mysterious movie producer form 5 gangs who rule the low.",
//                 "category": ["Action", "Crime", "Drama"],
//                 "thumbnail": "Cartel.jpg"
//             },
//             {
//                 "name": "Matsya Kaand",
//                 "description": "A master of disguise, a charmer, and a smooth talker - this is a story about genius conman Matsya Thada. Fate throws him a curveball when a cunning and ruthless cop wants to apprehend him at... Read all. Fate throws him a curveball when a cunning and ruthless cop wants to apprehend him at any cost.",
//                 "category": ["Action", "Crime", "Drama"],
//                 "thumbnail": "Matsya Kaand.jpg"
//             },
//             {
//                 "name": "Vincenzo",
//                 "description": "During a visit to his motherland, a Korean-Italian mafia lawyer gives a conglomerate a taste of its own medicine with a side of justice.",
//                 "category": ["Action", "Crime", "Drama"],
//                 "thumbnail": "Vincenzo.jpg"
//             },
//             {
//                 "name": "Harry potter",
//                 "description": "Harry Potter is a series of seven fantasy novels written by British author J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry.",
//                 "category": ["Fantasy","young adult fiction","developmental novel","children's fiction"],
//                 "thumbnail": "harry potter.jpg"
//             },


//         ]);
//     } catch (error) {
//         console.log(error);
//     }
// }


// insertMovies()