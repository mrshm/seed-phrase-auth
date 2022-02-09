const Logger = require('../helpers/Logger')

class ServerMaintenance {
    static async notFound(req, res, next) {
		try {
			Logger.error('ERROR: Route not found: ' + req.originalUrl)
	
			res.status(404).json({
				message: "Route not found"
			}).end()
		} catch (error) {
			throw error
		}
	}

    static async maintenance(req, res, next) {
		try {
			if (process.env.MAINTENANCE_MODE === 'true') {
                Logger.log('Maintenance: ' + req.originalUrl)

                res.status(503).json({
					message: "Server is down due maintenance."
				}).end()
			} else {
				next()
			}
		} catch (error) {
			throw error
		}
	}
}

module.exports = ServerMaintenance