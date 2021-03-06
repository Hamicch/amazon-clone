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

// GET request - Get all products
router.get('/products', async (req, res) => {
	try {
		let products = await Product.find();

		res.json({
			// succcess: true,
			products: products,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

// GET request - Get a single product
router.get('/products/:id', async (req, res) => {
	try {
		let product = await Product.find({ _id: req.params.id });

		res.json({
			// succcess: true,
			product: product,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

// PUT request - Update a single product
router.put('/products/:id', upload.single('photo'), async (req, res) => {
	try {
		let product = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					price: req.body.price,
					category: req.body.categoryID,
					photo: req.file.location,
					description: req.body.description,
					owner: req.body.ownerID,
				},
			},
			{
				upsert: true,
			}
		);

		res.json({
			// succcess: true,
			updatedProduct: product,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

// DELETE request - Delete a product
router.delete('/products/:id', async (req, res) => {
	try {
		let deletedProduct = await Product.findByIdAndDelete({
			_id: req.params.id,
		});

		if (deletedProduct) {
			res.json({
				succcess: true,
				message: 'Successfully deleted',
			});
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
