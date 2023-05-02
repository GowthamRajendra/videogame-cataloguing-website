const express = require("express");
const {
    searchGames,
    changePage,
    searchGameById,
    searchGamesByTag
} = require("../controllers/rawgGamesController.js");

const router = express.Router();

// client searching for games
router.get('/searchGames', searchGames);

// client changes pages on searched items
router.get('/changePage', changePage);

// get additional info for the game's page
router.get('/searchGameById', searchGameById);

// searching using tags
router.get('/searchGamesByTag', searchGamesByTag);

// export router
module.exports = router;