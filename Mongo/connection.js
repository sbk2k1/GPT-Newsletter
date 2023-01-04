require('dotenv').config();
const mongoose = require('mongoose');

// connect to the database
mongoose.connect(process.env.MONGODB_URI.replace("<password>", process.env.MONGODB_PASSWORD), { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
 console.log("Connected to database");
}
).catch(() => {
 console.log("Connection failed");
});
