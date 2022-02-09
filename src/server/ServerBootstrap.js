const express = require('express')

const ServerExpress = require('./ServerExpress')
const ServerRouter = require('./ServerRouter')
const ServerFileSystem = require('./ServerFileSystem')

const App = express()

class ServerBootstarp {
    static boot() {
        try {
            ServerExpress.setup(App, express)
            ServerRouter.setup(App)
            
            ServerFileSystem.setup()
            return App
        } catch (error) {
            throw error
        }
    }
}

module.exports = ServerBootstarp