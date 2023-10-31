### Technologies Used:
Express Express-validator
MongoDB/Mongoose
JWT
Multer 
BCrypt

### To start using this project, please follow these steps:

1. Run "npm install" command to install all necessary packages and dependencies.

2. Create a file named ".env" and add the following values to it:
```
MONGODB="" # "...mongodb.net/blog?..."
PORT="" # || 4444
SECRETCODE="" # JWT
```

3. To run the project, use either "npm run start:dev" or "node index.js" commands.

### Example requests:

1. POST http://localhost:port/auth/register
Request body:
```
{
    "email": "",
    "password": "",
    "fullName": "",
    "avatarUrl": ""
}
```

2. POST http://localhost:port/auth/login
Request body:
```
{
    "email": "",
    "password": ""
}
```

3. GET http://localhost:port/auth/me
**This request requires a Bearer token.**

4. POST http://localhost:port/posts
**This request requires a Bearer token.**
Request body:
```
{
    "title": "",
    "text": "",
    "tags": "... , ..."
}
```

5. DELETE http://localhost:port/posts/:id
**This request requires a Bearer token.**

6. GET http://localhost:port/posts/:id

7. PATCH http://localhost:port/posts/:id
**This request requires a Bearer token.**
Request body:
```
{
    "title": "",
    "text": "",
    "tags": "...,..."
}
```

8. POST http://localhost:port/upload
**This request requires a Bearer token.**
form-data, key: image, value: file.
