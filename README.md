# Shadow Speak web App

Shadow speak web app is similar to wishper website.Those who don't know about Wishper website.

Whisper is a social media platform where users can anonymously share their thoughts and feelings.

This is a full-stack web application built with Node.js and Express.js framework. It uses MongoDB as the database and integrates with Passport.js for user authentication using Google OAuth2. The application supports user registration and login, and allows users to submit secrets. The application also displays a page that lists all the secrets submitted by users. It uses EJS as the template engine to render HTML pages.


Here's the [App Link](https://shadow-speak-neeraj.cyclic.app)


## Packages used

- **Express**: a framework for building web applications in Node.js
- **Body Parser**: a middleware library that parses incoming request bodies in a middleware before your handlers, available under the req.body property.
- **EJS**: a templating engine for Express.
- **Mongoose**: a library for working with MongoDB, a popular NoSQL database.
- **express-session**: a middleware for managing sessions in Express.
- **Passport**: a middleware for handling authentication in Express.
- **passport-local-mongoose**: a plugin for Passport that uses Mongoose to store user information.
- **passport-google-oauth20**: a plugin for Passport that enables Google authentication.
- **mongoose-findorcreate**: a plugin for Mongoose that adds a findOrCreate method to Mongoose models.
- **bcrypt**: a library for hashing passwords.
## Tech Stack

**Client:** HTML, CSS, Bootstrap

**Server:** Node, Express, EJS, MongoDB, Mongoose, 


## Features

**The application's main flow appears to be as follows**:

- Users can visit the home page and either log in or register.
- If they choose to log in, they can either log in with their Google account or with a custom username and password.
- If they choose to register, they can create a custom username and password.
- Once logged in, users can access a page with secrets shared by other users.
- They can also submit their own secrets, but only if they are logged in.
- The data of the users, secrets and other details are stored in a MongoDB database.


## Lessons Learned

I learned how to create an authentication system using Passport.js and MongoDB with the following steps:

Import the required modules: express, body-parser, ejs, mongoose, express-session, passport, passport-local-mongoose, passport-google-oauth20, bcrypt, and mongoose-findorcreate.


Set up an express app and use body-parser to parse incoming requests and express-session for session management.

Connect to MongoDB using Mongoose and define a user schema with fields for email, password, googleId, and secret.

Use the passport-local-mongoose and mongoose-findorcreate plugins for Mongoose for user authentication.

Use Passport.js for authentication with the local strategy and Google OAuth 2.0.

Set up routes for different pages such as home, login, register, logout, secrets, and submit.

Implement authentication using the Passport.js middleware in routes such as the '/auth/google' route.

Use MongoDB to store and retrieve users and their secrets.
You also learned how to use the Passport.js serialize and deserialize functions to store the user in the session.




## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/neeraj-khatri-61aa6a241/)







## Screenshots
![Screenshot (13)](https://user-images.githubusercontent.com/116746130/216089043-a94bc79d-e19b-4057-8962-00e75e0fd107.png)
![Screenshot (17)](https://user-images.githubusercontent.com/116746130/216089085-dbdebb5a-91b0-4c89-9982-a8bef1c42eff.png)

![Screenshot (18)](https://user-images.githubusercontent.com/116746130/216089130-38a4f5c5-fed6-4e83-bac5-fa0945da1ca3.png)



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  node app.js
```

