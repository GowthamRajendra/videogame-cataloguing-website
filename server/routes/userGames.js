const express = require("express");
const {
    getAllGames,
    getGame,
    postGame,
    deleteGame,
    updateGame,
} = require("../controllers/userGamesController.js");

const requireLogin = require("../middleware/requireLogin.js");

const router = express.Router();

// make sure user is logged in before any other requests
router.use(requireLogin);

// get all games of a user? probably for their profile
router.get('/', getAllGames);

// get a single game
// :id is a variable, we can replace this with something
router.get('/:id', getGame);

//  send a game to be stored?
router.post('/', postGame);

//  delete a game from user's db?
router.delete('/:id', deleteGame);

// update a game info
router.patch('/:id', updateGame);

// export router
module.exports = router;