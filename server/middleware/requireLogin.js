const jwt = require('jsonwebtoken');
const userModel = require("../model/userModel.js");

const requireLogin = async (req, res, next) => {

    // get JWT from request headers
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "No token found." });
    }

    // authorization is in form "bearer {JWT}"
    // using split to only get the JWT
    const token = authorization.split(' ')[1];

    // secret key. should be some code to be secure
    // put in .env file as SECRET_KEY={whatever you want}
    const SECRET_KEY = process.env.SECRET_KEY;

    try {
        // this will get user's id 
        const { _id } = jwt.verify(token, SECRET_KEY);

        // finds user based on id and only selects id and no other info
        req.user = await userModel.findOne({ _id }).select('_id');

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request not authorized' });
    }

}

module.exports = requireLogin