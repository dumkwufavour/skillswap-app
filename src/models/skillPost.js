const mongoose = require('mongoose');

const skillPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    contactInfo: {
        whatsapp: { type: String },
        email: { type: String },
    },
    category: { type: String },
    location: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SkillPost', skillPostSchema);
