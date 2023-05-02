const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    background_image: {
        type: String,
        required: true
    },
    review: {
        type: String
    },
    rating: {
        type: Number
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true }); // timestamps give when doc updated/added

// creates collection "Games" 
module.exports = mongoose.model('Game', gameSchema)
