const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        name: String,
        email: {
            type: String,
            //This us just here to make sure the email is an email and is different from other emails
            unique: true,
            required: true,
        },

        password: {
            type: String,
            required: true,
        }

    }
)

const User = mongoose.model('User', userSchema);
module.exports = User;