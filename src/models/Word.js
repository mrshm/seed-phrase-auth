const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
	word: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
}, {
	timestamps: false
})

wordSchema.methods.toJSON = function () {
	const word = this
	const wordObject = word.toObject()

	delete wordObject._id
	delete wordObject.__v

	return wordObject
}

const Word = mongoose.model('Word', wordSchema)

module.exports = Word