const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const path = require('path');
const User = require('./models/user');

dotenv.config({ path: path.resolve(__dirname + '/.env') });

const app = express();

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

//Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const ownerRoutes = require('./routes/owner');

app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);

const port = process.env.PORT || 2021;

app.listen(port, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Listening on port, ${port}`);
	}
});
