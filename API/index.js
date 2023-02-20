import express from "express";
import bodyParser from "body-parser"
import cors from "cors"
import routers from "./routers/shoes.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.DATABASE_URL


app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
app.use(cors())

app.get('/', (req, res) => {
    res.send("Success");
})
app.use('/shoes', routers)

mongoose.set("strictQuery", false);
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connected to DATABASE");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log('err: ', err);
    })


