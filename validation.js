import { body } from "express-validator";

export const loginValidation = [
    body("email", "Invalid username or password").isEmail(),
    body("password", "Invalid username or password").isLength({
        min: 8,
    }),
];

export const registerValidation = [
    body("email", "Invalid mail format").isEmail(),
    body("password", "Password must be at least 8 characters long").isLength({
        min: 8,
    }),
    body("fullName", "Enter a name").isLength({ min: 3 }),
    body("avatarUrl", "Invalid profile picture link").optional().isURL(),
];

export const createPostValidation = [
    body("title", "Enter a title for your article")
        .isLength({ min: 3 })
        .isString(),
    body("text", "Enter the text of the article")
        .isLength({ min: 3 })
        .isString(),
    body("tags", "Incorrect tag format").optional().isString(),
    body("imageUrl", "Invalid image link").optional().isString(),
];
