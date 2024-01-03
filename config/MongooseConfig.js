require('dotenv');
const mongoose = require('mongoose');
mongoose.connect(process.env.database_url);
const db = mongoose.connection;
db.on('error', console.error.bind(console, "error on db connection"));
db.once('open', () => console.log("Successfully connected to the db"));