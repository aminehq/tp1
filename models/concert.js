const mongoose = require('mongoose');
const concertSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artists",
        required: true
    }
});
module.exports = mongoose.model("Concert", concertSchema);