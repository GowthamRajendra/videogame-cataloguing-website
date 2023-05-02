require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const gamesRoutes = require("../routes/userGames.js");
const rawgRoutes = require("../routes/rawgGames.js")
const userRoutes = require("../routes/user.js")
const app = express();

// allows cross origin resource sharing.
const cors = require("cors");
app.use(cors());

// middleware 
// this allows us to access the json from requests
app.use(express.json());

// currently only logs requests
app.use((req, res, next) => {
    console.log(`LOG: ${req.url}`);
    next(); // have to run this so we can move onto next piece of middleware
});

// routes
app.use('/user/games', gamesRoutes);
app.use('/rawg/games', rawgRoutes);
app.use('/user', userRoutes);

// please sign up for a free MongoDB Atlas account and create a cluster to receive this url
// the username and password are for accessing your database
// it will be roughly in the form of mongodb+srv://{username}:{password}@{your cluster name}.7jexus8.mongodb.net/{your database name}?retryWrites=true&w=majority
// our database is not included for security reasons
// put thin in .env as MONGODB_URL={your url}
const mongoURL = process.env.MONGODB_URL;

// connect to database
mongoose.connect(mongoURL)
    .then(() => {
        // dont listen to requests until we connect to database
        app.listen(3000, () => {
            console.log("listening on port 3000");
        });
    })
    .catch((error) => {
        console.log(error);
    });