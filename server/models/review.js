const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	headline: String,
	body: Number,
	rating: Number,
	photo: String,
	productID: { type: Schema.Types.ObjectId, ref: 'Product' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Review', ReviewSchema);
