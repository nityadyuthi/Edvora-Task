const mongoose = require('mongoose');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!");
})