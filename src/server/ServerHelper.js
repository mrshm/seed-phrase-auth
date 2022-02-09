const Logger = require('../helpers/Logger')

class ServerHelper {
    static setup(server, port) {
        server.set('port', port)
		server.on('error', this.onError)
		server.on('listening', this.onListening)
    }

    static normalizePort(value) {
		const port = parseInt(value, 10)

		if (isNaN(port)) {
			return value
		}
		
		if (port >= 0) {
			return port
		}

		return false
	}

    static onError(error) {
		if (error.syscall !== 'listen') {
			throw error
		}

		const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

		switch (error, code) {
			case 'EACCES':
				Logger.error(`${bind} requires elevated privileges`)
				process.exit(1)
				break

			case 'EADDRINUSE':
				Logger.error(`${bind} is already in use`)
				process.exit(1)
				break

			default:
				throw error
		}
	}

	static onListening(server) {
		const addr = server.address()

		Logger.log(`Listening on ${typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`}`)
	}
}

module.exports = ServerHelper