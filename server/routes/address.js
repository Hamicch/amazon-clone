const router = require('express').Router();
const Address = require('../models/address');
const verifyToken = require('../middlewares/verify-token');

// POST request - create  a new address

// user: { type: Schema.Types.ObjectId, ref: 'User' },
// 	country: String,
// 	fullName: String,
// 	streetAddress: String,
// 	city: String,
// 	state: String,
// 	zipCode: Number,
// 	phoneNumber,
// 	deliverInstructions: String,
// 	securityCode: String,

router.post('/addresses', verifyToken, async (req, res) => {
	try {
		let address = new Address();
		address.user = req.decoded._id;
		address.country = req.body.country;
		address.fullName = req.body.fullName;
		address.streetAddress = req.body.streetAddress;
		address.city = req.body.city;
		address.state = req.body.state;
		address.zipCode = req.body.zipCode;
		address.phoneNumber = req.body.phoneNumber;
		address.deliverInstructions = req.body.deliverInstructions;
		adrdess.securityCode = req.body.securityCode;

		await address.save();

		res.json({
			status: true,
			message: 'Successfully created a new  category',
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

// GET request
router.get('/categories', async (req, res) => {
	try {
		let categories = await Category.find();

		res.json({
			succcess: true,
			categories: categories,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
