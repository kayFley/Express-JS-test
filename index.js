import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import cors from "cors";
import mongoose from "mongoose";

import { registerValidation, loginValidation, createPostValidation } from "./validation.js";
import { validationErrors, checkAuth } from "./check/index.js";
import { UserController, PostController } from "./control/index.js";

dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("[db] connected"))
    .catch((err) => console.log("[db] error", err));

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        if (!fs.existsSync("uploads")) {
            fs.mkdirSync("uploads");
        }
        cb(null, "uploads");
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Routes for authentication
app.post("/auth/login", loginValidation, validationErrors, UserController.login);
app.post("/auth/register", registerValidation, validationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

// Route for uploading images
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});
// Routes for posts
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, createPostValidation, validationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, createPostValidation, validationErrors, PostController.update);
app.get("/tags", PostController.getLastTags);
app.get("/posts/tags", PostController.getLastTags);

// Start server
app.listen(process.env.PORT || 3000, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log("[server] Server started");
});
