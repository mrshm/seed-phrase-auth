const fs = require('fs')
const path = require('path')

class Logger {
	static log() {
		for(let i = 0; i < arguments.length; i++){
			this.makeLog(`INFO \t${arguments[i]}`)
		}
	}

	static debug() {
		if (process.env.NODE_ENV == 'production') {
			return
		}

		for(let i = 0; i < arguments.length; i++){
			this.makeLog(`INFO \t${arguments[i]}`)
		}
	}

	static error() {
		for(let i = 0; i < arguments.length; i++){
			this.makeLog(`ERROR\t${arguments[i]}`)
		}
	}

	static makeLog(message) {
		message = new Date().toLocaleString('ir') + '\t' + message

		fs.appendFile(path.resolve('./logs/log.txt'), message + '\n', (error) => {
			console.log(message)
			if (error) console.log(error);
		})
	}
}

module.exports = Logger