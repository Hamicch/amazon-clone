const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user');

dotenv.config({ path: path.resolve(__dirname + '/.env') });

const app = express();

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.json('Hello amazon clone');
});

app.post('/', (req, res) => {
	let user = new User();
	user.name = req.body.name;
	user.email = req.body.email;
	user.password = req.body.password;

	user.save((err) => {
		if (err) {
			res.json(err);
		} else {
			res.json('Successfully saved!');
		}
	});
});

const url = mongoose.connect(
	process.env.DATABASE,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},

	(err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Connected to the database');
		}
	}
);

const port = process.env.PORT || 2021;

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Listening on port, ${port}`);
	}
});
