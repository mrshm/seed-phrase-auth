const bcrypt = require('bcryptjs')

const User = require('../models/User')

const Logger = require("../helpers/Logger")

const Encryption = require('../utils/Encryption')

class UserController {
    static async create(req, res) {
        try {
            const user = new User(req.body)

            await user.save()
            const token = await user.generateAuthToken()
            const phrase = await user.generateSeedPhrase()

            res.status(201).json({ user, token, phrase }).end()
        } catch (error) {
            Logger.error('Error: User controller -> Create method: ' + error)

            res.status(400).send(error).end()
        }
    }

    static async login(req, res) {
        try {
            const user = await User.findByCredentials(req.body.username, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).json({ user, token }).end()
        } catch (error) {
            Logger.error('Error: User controller -> Login method: ' + error)

            res.status(400).send(error).end()
        }
    }

    static async logout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.user.save()
    
            res.status(200).send().end()
        } catch (error) {
            Logger.error('Error: User controller -> Logout method: ' + error)

            res.status(500).send().end()
        }
    }

    static async profile(req, res) {
        try {
            res.status(200).json(req.user).end()
        } catch (error) {
            Logger.error('Error: User controller -> Profile method: ' + error)
            
            res.status(500).send().end()
        }
    }

    static async forgetPassword(req, res) {
        try {
            let words = ""
            req.body.phrase.forEach(phrase => {
                words = words + phrase
            });

            const phrase = Encryption.SHA1(words.toString())
            User.findOneAndUpdate({ phrase }, { $set: { password: await bcrypt.hash(req.body.password, 8) } }).then(() => {
                res.status(200).send().end()
            }).catch((error) => {
                res.status(400).send(error).end()
            })
        } catch (error) {
            Logger.error('Error: User controller -> Forget password method: ' + error)
            
            res.status(500).send().end()
        }
    }

    static async forgetUsername(req, res) {
        try {
            console.log(req.body.phrase);
            let words = ""
            req.body.phrase.forEach(phrase => {
                words = words + phrase
            });

            console.log(words);
            console.log(words.toString());

            const phrase = Encryption.SHA1(words.toString())
            console.log(phrase);
            const user = await User.findOne({ phrase })

            console.log(user);

            if (user) {
                const token = await user.generateAuthToken()
                res.status(200).json({ user, token }).end()
            } else {
                res.status(404).send().end()
            }
        } catch (error) {
            Logger.error('Error: User controller -> Forget username method: ' + error)
            
            res.status(500).send().end()
        }
    }
}

module.exports = UserController