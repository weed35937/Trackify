import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

const app = express();
dotenv.config();

/** Middlewares */
app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(morgan("tiny"));

const port = process.env.PORT || 8700;

const connect = () => {
    mongoose.set("strictQuery", true);
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(err);
        });
};

app.use((err, req, res) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.use(express.json());

app.listen(port, () => {
    console.log("Connected");
    connect();
});
