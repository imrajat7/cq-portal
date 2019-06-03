# cq-portal
This project consists of portal of cq

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `nodemon app` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [nodemailer](https://github.com/nodemailer/nodemailer) - For sending authentication and other mails to the users
- [multer](https://github.com/expressjs/multer) - For uploading images of the user
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [bodyparser](https://github.com/expressjs/body-parser) - For handling body of req.
- [ejs](https://github.com/mde/ejs) - For templating.
- [jquery-confirm] - For confirming the responses of users.
