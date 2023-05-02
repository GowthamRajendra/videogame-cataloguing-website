const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // emails must be unique
    },
    password: {
        type: String,
        required: true
    }
});

// creating signup function for schema
userSchema.statics.signup = async function (username, email, password) {
    if (!username || !email || !password) {
        throw Error('One or more fields are empty. Please fill them in.');
    }

    // email validation
    if (!validator.isEmail(email)) {
        throw Error('Invalid email.')
    }

    // password validation
    if (!validator.isStrongPassword(password)) {
        throw Error('Choose a stronger password.');
    }

    const emailExists = await this.findOne({ email });

    if (emailExists) {
        throw Error("Email is in use. Try logging in.");
    }

    // adding random string to end of password
    // passsing in 10. more = harder to decrypt 
    const passwordSalt = await bcrypt.genSalt(10);
    // hashing password 
    const passwordHash = await bcrypt.hash(password, passwordSalt);

    // creating and returning model to be stored in db
    const user = await this.create({ username, email, password: passwordHash });

    return user;
}

// creating login function for schema
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('One or more fields are empty. Please fill them in.');
    }

    const existingUser = await this.findOne({ email });

    if (!existingUser) {
        throw Error("This email is not connected to an account. Try signing up for an account.");
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password)

    if (!matchPassword) {
        throw Error('Incorrect password.');
    }

    return existingUser;
}

// will create collection Users
module.exports = mongoose.model('User', userSchema);