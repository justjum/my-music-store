const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    email: { type: String, email: true},
})

// Export model
module.exports = mongoose.model("Subscription", SubscriptionSchema);