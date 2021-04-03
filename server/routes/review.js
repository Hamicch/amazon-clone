const router = require('express').Router();
const Review = require('../models/review');
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');
const verifyToken = require('../middlewares/verify-token');

// Post request
router.post(
	'/reviews/:productID',
	[verifyToken, upload.single('photo')],
	async (req, res) => {
		try {
			const review = new Review();
			review.headline = req.body.headline;
			review.body = req.body.body;
			review.rating = req.body.rating;
			review.photo = req.file.location;
			review.productID = req.params.productID;
			review.user = req.decoded._id;

			await Product.update({ $push: { reviews: review._id } });

			const saveReview = await review.save();

			if (saveReview) {
				res.json({
					success: true,
					message: 'Succesfully added review',
				});
			}
		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
);

// Get request
router.get('/reviews/:productID', async (req, res) => {
	try {
		const productReviews = await Review.find({
			productID: req.params.productID,
		})
			.populate('user')
			.exec();

		res.json({
			succcess: true,
			reviews: productReviews,
		});
	} catch (err) {
		res.status(500).json({
			success: false,
			message: err.message,
		});
	}
});

module.exports = router;
