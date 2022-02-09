const router = require('express').Router()

class RootRouter {
	static get domain() {
		return '/'
	}

  static setupRouter() {
		router.get('/', (req, res) => {
            res.status(200).json({
                message: 'Welcome to the API'
            }).end()
        })

		return router
	}
}

module.exports = RootRouter