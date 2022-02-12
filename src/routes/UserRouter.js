const router = require('express').Router()

const UserController = require('../controllers/UserController')

class UserRouter {
	static get domain() {
		return '/user'
	}

  static setupRouter() {
		router.post('/', UserController.create)

		return router
	}
}

module.exports = UserRouter