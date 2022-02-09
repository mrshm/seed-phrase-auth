const morgan = require('morgan')

const ServerMaintenance = require('./ServerMaintenance')

class ServerExpress {
    static setup(app, express) {
        try {
            app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time ms :res[content-length] ":referrer" ":user-agent"'))
            
            app.use(ServerMaintenance.maintenance)

            app.use(express.json({
				limit: '1mb'
			}))

            app.use(express.urlencoded({
				extended: false,
				limit: '1mb'
			}))
        } catch (error) {
            throw error
        }
    }
}

module.exports = ServerExpress