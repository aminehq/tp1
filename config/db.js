const mongoose = require('mongoose');
exports.connectDB = () => {
    return mongoose.connect(process.env.MONGO_URI)
}