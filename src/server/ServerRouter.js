const fs = require('fs')
const path = require('path')

const ServerMaintenance = require('./ServerMaintenance')

const Logger = require('../helpers/Logger')

const ROUTES_PATH = path.resolve(__dirname, '../routes')

class ServerRouter {
	static setup(app) {
		try {
			fs.readdir(ROUTES_PATH, (error, files) => {
				if (error) {
					this.raiseError(error)

					return false
				}

				files.forEach(file => {
					let Router = require(path.resolve(ROUTES_PATH, file))

					if (Router.domain != null) {
						Logger.debug(`Route ${file} loaded`)

						app.use(Router.domain, Router.setupRouter())
					}
				})

				this.catchUnhandled(app)
			})
		} catch (error) {
			throw error
		}
	}

	static catchUnhandled(app) {
		app.use(ServerMaintenance.notFound)
	}

	static raiseError(error) {
		Logger.error('Route loader: ' + error)

		process.exit(1)
	}
}

module.exports = ServerRouter