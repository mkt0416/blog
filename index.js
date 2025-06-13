
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`server running port ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start();

app.use(cors());
app.use(express.json());
app.use('/', require('./routes'));





