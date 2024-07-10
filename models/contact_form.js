const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    email: { type: String, email: true},
    phone: { type: Number, minLength: 7, maxLength: 9},
    enquiry_type: {
        type: String,
        required: true,
        enum: ["General Enquiry", "Tuition"],
        default: "General Enquiry",
    },
    instrument: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"]
    },
    comment: { type: String, maxLength: 500 },
    date: { type: Date, default: Date.now }
})

// Export model
module.exports = mongoose.model("Contact Form", ContactFormSchema);