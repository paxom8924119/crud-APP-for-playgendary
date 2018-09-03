import mongoose from 'mongoose';

const newsSchema = mongoose.Schema({
		price: String,
		item: String,
		auther_id : String,
});

module.exports = mongoose.model('ListNews', newsSchema);