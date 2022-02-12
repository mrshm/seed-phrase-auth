const router = require('express').Router()

const WordController = require('../controllers/WordController')

class WordRouter {
	static get domain() {
		return '/word'
	}

  static setupRouter() {
		router.post('/', WordController.add)

		return router
	}
}

module.exports = WordRouter