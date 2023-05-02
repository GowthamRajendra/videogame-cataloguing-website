const userModel = require('../model/userModel.js')
const jwt = require('jsonwebtoken')

// secret key. should be some code to be secure
// put in .env file as SECRET_KEY={whatever you want}
const SECRET_KEY = process.env.SECRET_KEY;

// creating token for authentication
// will let user stay logged in 
const createJWT = (id) => {
    // id is payload, user will be logged out after 30days
    return jwt.sign({ _id: id }, SECRET_KEY, { expiresIn: '30d' });
};

// function for login route
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);

        // creating and sending encoded token
        const JWT = createJWT(user._id);

        username = user.username;
        const userID = user._id;

        res.status(200).json({ userID, username, email, JWT });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// function for signup route
const userSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await userModel.signup(username, email, password);

        // creating and sending encoded token
        const JWT = createJWT(user._id);
        const userID = user._id;

        res.status(200).json({ userID, username, email, JWT });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    userLogin,
    userSignup
};