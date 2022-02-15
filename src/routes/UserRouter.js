const router = require('express').Router()

const UserController = require('../controllers/UserController')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

class UserRouter {
	static get domain() {
		return '/user'
	}

  static setupRouter() {
		router.post('/', UserController.create)
		router.get('/', AuthMiddleware, UserController.profile)
		router.post('/login', UserController.login)
		router.get('/logout', AuthMiddleware, UserController.logout)
		router.post('/forgot/password', UserController.forgetPassword)
		router.post('/forgot/username', UserController.forgetUsername)

		return router
	}
}

module.exports = UserRouter