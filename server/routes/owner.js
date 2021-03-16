const router = require('express').Router();
const Owner = require('../models/owner');

// POST request - create  a new category

router.post('/owner', async (req, res) => {
	try {
		let owner = new Owner();
		owner.name = req.body.name;
		owner.about = req.body.about;
		// owner.photo = req.body.photo;

		await owner.save();

		res.json({
			status: true,
			massage: 'Successfully created a new owner',
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

// GET request
router.get('/owners', async (req, res) => {
	try {
		let owners = await Owner.find();

		res.json({
			// succcess: true,
			owners: owners,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
