const mongoose = require('mongoose');

const DB = async () => {
    try {
        // Connecting to MongoDB using the updated Mongoose options
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit the process if there is an error
    }
}

module.exports = DB;
