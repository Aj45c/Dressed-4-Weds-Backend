const User = require('../models/user.js')
const bcrypt = require('bcrypt') //this allows me to hash passwords, though i am debating using Firebase but lets see (first time using bcrypt)

const newUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
    
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "That Email is already being used"});
        }

        const passwordHashed = await bcrypt.hash(password,10)

        const user = new User ({
            name,
            email,
            password: passwordHashed
        })

        await user.save();

        //What I did in this try section was get the info for the req.body and then check to see if the email they used
        // was used before using existingUser and then I hashed the password because secruity. Udpated the new user using
        // the hashed password and save it to the db
        res.status(201).json({ message: "New User created!"})
} catch (error) {
    res.status(500).json({ error: "Failed to create a new User"})
    console.error(error)

}
}

const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: 'Invalid Username/Password'})
        }

        const comparePasswords = await bcrypt.compare(password, user.password)

        if (!comparePasswords) {

            return res.satus(400).json({ message: 'Invalid Username/Password'})
        }

        res.status(200).json({ message: "Login Worked!"})
    } catch(error) {

        res.status(500).json({ error: 'Failed to Login'})
        console.error(error)
    };
}


module.exports = {newUser,userLogin};