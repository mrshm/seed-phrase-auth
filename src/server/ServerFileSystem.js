const fs = require('fs')
const path = require('path')

const LOG_PATH = path.resolve('./logs')

class ServerFileSystem {
	static async setup() {
		try {
			if (!fs.existsSync(LOG_PATH)) fs.mkdirSync(LOG_PATH)
		} catch (error) {
			throw error
		}
	}
}

module.exports = ServerFileSystem