const User = require('../models/User')

const Logger = require("../helpers/Logger")

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
}

module.exports = UserController