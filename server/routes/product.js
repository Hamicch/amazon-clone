const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');

// POST request - create  a new product

router.post('/products', upload.single('photo'), async (req, res) => {
	// res.send('POST');
	try {
		let product = new Product();
		product.title = req.body.title;
		product.description = req.body.description;
		product.photo = req.file.location;
		product.stockQuantity = req.body.stockQuantity;
		await product.save();

		res.json({
			status: true,
			massage: 'Successfully saved',
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
