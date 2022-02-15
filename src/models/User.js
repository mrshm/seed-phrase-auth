const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Word = require('./Word')

const Encryption = require('../utils/Encryption')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if (value.toLowerCase().includes('password')) {
				throw new Error('password cannot contain password')
			}
		}
	},
	phrase: {
		type: String,
		required: false,
		trim: true
	},
	tokens: [{
		token: {
			type: String,
			required: true
		}
	}]
}, {
	timestamps: true
})

userSchema.methods.toJSON = function () {
	const user = this
	const userObject = user.toObject()

	delete userObject.password
	delete userObject.tokens
	delete userObject.phrase
	delete userObject.__v

	return userObject
}

userSchema.methods.generateAuthToken = async function () {
	const user = this
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
	
	user.tokens = user.tokens.concat({ token })
	await user.save()
	
	return token
}

userSchema.methods.generateSeedPhrase = async function () {
	const user = this
	const seedPrase = await Word.aggregate([{ $sample: { size: 5 } }])

	let words = ""
	seedPrase.forEach(phrase => {
		words = words + phrase.word
	});

	console.log(words);
	console.log(words.toString());

	const phrase = Encryption.SHA1(words.toString())

	console.log(phrase);

	user.phrase = phrase
	await user.save()

	return seedPrase
}

userSchema.statics.findByCredentials = async (username, password) => {
	const user = await User.findOne({ username })

	if (!user) {
		throw new Error('there is no user with username that you provides')
	}

	const isMatch = await bcrypt.compare(password, user.password)

	if (!isMatch) {
		throw new Error('username and password does not match')
	}

	return user
}

userSchema.pre('save', async function (next) {
	const user = this 

	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8)
	}

	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User