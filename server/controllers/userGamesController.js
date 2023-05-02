const GameModel = require("../model/gameModel.js");
const mongoose = require("mongoose")

// get all games
const getAllGames = async (req, res) => {
    const user_id = req.user._id;

    // using user_id will find only games added by that user
    const games = await GameModel.find({ user_id }); //can also do .sort({createdAt: -1}) descend order
    res.status(200).json(games);
};

// get a single game
const getGame = async (req, res) => {
    const gameID = req.params.id;

    try {
        const game = await GameModel.findById(gameID);
        res.status(200).json(game);

    } catch (error) {
        res.status(400).json({ error: "Invalid ID or no game found with that ID" });
    }
};


// post a new game
const postGame = async (req, res) => {
    const { gameID, name, background_image, rating, review } = req.body;

    try {
        const user_id = req.user._id; // get user's id (it was attached in requirelogin.js)
        const game = await GameModel.create({ gameID, name, background_image, rating, review, user_id });
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a game
const deleteGame = async (req, res) => {
    const gameID = req.params.id;

    try {
        const game = await GameModel.findOneAndDelete({ _id: gameID });
        res.status(200).json(game);

    } catch (error) {
        res.status(400).json({ error: "Invalid ID or no game found with that ID" });
    }
};

// update game
const updateGame = async (req, res) => {
    const gameID = req.params.id;

    try {
        const game = await GameModel.findOneAndUpdate(
            { _id: gameID },
            {
                rating: req.body.rating,
                review: req.body.review
            },
        );
        res.status(200).json(game);

    } catch (error) {
        res.status(400).json({ error: "Invalid ID or no game found with that ID" });
    }
};


module.exports = {
    getAllGames,
    getGame,
    postGame,
    deleteGame,
    updateGame
};