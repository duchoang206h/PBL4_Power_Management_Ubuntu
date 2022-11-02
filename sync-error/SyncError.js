const mongoose = require('mongoose');
const { config } = require('dotenv');
config();
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
    } catch (error) {
        
    }
}
const syncErrorSchema = new mongoose.Schema({
    error: {
        type: String
    }
});
const SyncError = mongoose.model('sync_errors', syncErrorSchema);
module.exports = {
    connect,
    SyncError
}