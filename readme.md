# MERN Auth
A Simple Auth system for MERN stack apps, using JWT and Passport for authentication. Not really production ready, but just some code for small side-projects I'm working on that I don't want to use external auth services with.

Install & run with:

```bash
npm install
npm start
```
___  

## External Services Used
**Database**
* MongoDB via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Mongo because it's not really a **M**ERN stack app without it. MongoDB Atlas offers a nice free-tier for small hobby projects / development, so in my opinion it's a friendly option for devs just getting started with Mongo.  

**SMTP**
* [SMTP2GO](https://www.smtp2go.com/) - I'm using smtp2go since they also have a nice free-tier for small dev projects, only major downside is that they require private domain email (ie. gmail, yahoo, aol, etc won't work) to setup a new account.  
___

## Dependecies
* [bcryptjs]() - JS version of bcrypt for password hashing, using the pure JS version since the native bindings for bcrypt cause some installation errors on different machines
* [cors](https://github.com/expressjs/cors) - Allow cross-origin api requests
* [express](https://github.com/expressjs/express) - Handle HTTP requests
* [mongoose](https://github.com/Automattic/mongoose) - ORM for MongoDB

## Dev Dependencies
* [nodemon]()
* [dotenv]()
* [run-script-os]() - Cross-platform scripts

## API
