const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
    name: { type: String, required: true, unique: true}
});

// Export model
module.exports = mongoose.model("Brand", BrandSchema);