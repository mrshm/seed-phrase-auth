const Word = require('../models/Word')

const Logger = require("../helpers/Logger")

class WordController {
    static async add(req, res) {
        try {
            const word = new Word(req.body)

            await word.save()

            res.status(201).json({ word }).end()
        } catch (error) {
            Logger.error('Error: Word controller -> Add method: ' + error)

            res.status(400).send(error).end()
        }
    }
}

module.exports = WordController