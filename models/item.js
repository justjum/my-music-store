// Add a 'multiples' on hand functionality

const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    brand: { type: Schema.Types.ObjectId, ref: "Brand", required: true },
    model: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    colour: { type: String, required: true },
    description: { type: String, required: true },
    neck: { type: Schema.Types.ObjectId, ref: "Tonewood", required: true },
    fretboard: { type: Schema.Types.ObjectId, ref: "Tonewood", required: true },
    body: { type: Schema.Types.ObjectId, ref: "Tonewood", required: true },
    price: { type: Number, req: true},
    image: { type: String, req: true},
    image_alt: { type: String, req: true },
    quantity: { type: Number}, 
    featured: { type: Boolean, default: false }
})

// Virtual for Item's URL
ItemSchema.virtual("url").get(function () {
    return `/item/${this._id}`;
})

// Virtual for formatted price
ItemSchema.virtual("price_formatted").get(function () {
    return `$${this.price}`;
})

// Virtual for Image URL
ItemSchema.virtual("image_url").get(function() {
    return `./public/images/${this.image}`
})

// Export model
module.exports = mongoose.model("Item", ItemSchema);