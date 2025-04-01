Express web application for Authentication System
Node based appn express routing lib and used mongodb

Phase 1: Express.js Fundamentals

1. Introduction & Setup:
What is Express.js? Its purpose and role.
- fast, minimalist and flexible(web framework for Node.js). 
  It simplifies building server-side applications by providing features like routing, middleware, request handling, and templating support.

- Its main purpose is to streamline backend development in Node.js, making it easier to handle HTTP requests, manage routes, integrate with databases, and serve static files. Instead of writing a lot of boilerplate code in pure Node.js, Express provides a structured way to build web applications and APIs efficiently.

Installing Express.js via npm.
- npm install express

Creating a basic Express.js application skeleton.
- refer index.js or express website

Understanding app.listen().
- start the server



2. Routing:
Defined routes for different HTTP methods (GET, POST, PUT, DELETE, etc.).

Route parameters (/users/:id).

Route handlers and response methods (res.send(), res.json(), res.render()).

Route chaining
- This is a cleaner way to handle multiple methods on the same route.
  app.route('/articles/:articleId') creates a route object.
  .get(), .put(), and .delete() are chained to define handlers for different HTTP methods on the same route.


3. Middleware:
- Middleware functions process requests before they reach the actual route.

Concept of middleware functions.
- functions that have access to the request object (req), the response object (res), and the next() function in the application's request-response cycle.

Built-in middleware:
- express.static() (serving static files).
- express.json() (parsing JSON request bodies or can accept JSON data).
- express.urlencoded() (parsing URL-encoded request bodies).

Creating custom middleware.
- check the app.use in index.js

Middleware ordering.
- executed in the order they are defined using app.use().



Phase 2: Building Express.js Applications

we have created these routes with model and controller for Express app

Algorithms
- Register user
    - get data from URL
    - validate data
    - check if user already existing or not
    - create user in database
    - create a verification token
    - save token in database
    - send token as email to user (nodemailer and mailtrap)
    - send success status to user

- Verify User (based on URL which comes in your mail)
    - get token from URL
    - validate token is present or not
    - find user based on token
    - set isVrified
    - remove vrificationToken
    - send successs after save

- LogIn user
    - get email and password from URL
    - verfiy email and password
    - find user based on email
    - password compare from database using bcrypt compare
    - create jwt token
    - store in user cookie using cookie-parser
    - send success message

    Note: 
    Q: How we logged in user in system?
    A: we need to store token so that we can verify user on every request
      - store token in cookie


Note: 
  Password
    - we have used mongose schema pre and post hook
    - used bcrypt js




Extra Packages:
1. nodemon package :- auto re-render.
2. dotenv :- load env files.
3. cors :- allow only specific request
4. mongoose :- connect to mongoDB atlas.
5. cookie-parser :- enable storing token
6. bcrypt :- password hash
7. jsonwebtoken :- generate token
8. nodemailer :- send verification mail



Actions:
- npm init
- express install
- api create
- nodemon (optional)
- .env (install dotenv)
- CORS
- db connect(install mongosse)

- create model (schema and model via mongosee)
- create controller (logic functionality)
- create routes (express route)
