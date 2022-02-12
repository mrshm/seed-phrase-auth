const mongoose = require('mongoose')

mongoose.connect('mongodb://' +
	(process.env.MONGODB_HOST || '127.0.0.1') +
	':' +
	(process.env.MONGODB_PORT || '27017') +
	'/' +
	(process.env.MONGODB_DATABASE || 'seed-phrase-auth'), {
	useNewUrlParser: true,
})