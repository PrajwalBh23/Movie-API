const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: 'this field is required',
    },
    description:{
        type: String, 
        required: 'true',
    },
    category:{
        type: Array, 
        required: 'true',
    },
    thumbnail:{
        type: String, 
        required: 'true',
    }
});

movieSchema.index({"$**" : 'text'});

module.exports = mongoose.model('Movie', movieSchema);