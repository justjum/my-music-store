const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    status: { type: Boolean, default: false},
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    email: { type: String, email: true},
    phone: { type: Number, minLength: 7, maxLength: 9},
    street_address: { type: String, maxLength: 100 },
    city: { type: String, maxLengh: 50 },
    order_date: { type: Date, default: Date.now },
    items: [{ type: Schema.Types.ObjectId, ref: "Item"}],
});

// Virtual for order URL
OrderSchema.virtual("url").get(function() {
    return `/Order/${this._id}`
});

// Export model
module.exports = mongoose.model("Order", OrderSchema);