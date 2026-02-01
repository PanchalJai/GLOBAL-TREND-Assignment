const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const route = require('./routes/route.js')

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGOURL;

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("DB connected successfully");
        app.listen(PORT, () => {
            console.log(`server is running on the port : ${PORT}`);
        });
    }).catch((err) => {
        console.log(err);
    })

app.use("/api", route);