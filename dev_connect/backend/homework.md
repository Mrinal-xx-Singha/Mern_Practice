### ROUTE HANDLER

- Multiple route handler
- create multiple route handlers
- Play with the code
- next()
- errors along with res.send()

### MIDDLEWARE

- What is middleware ? why do we need it ?
- How express js handles request behind the scene
- app.use vs app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for All User routes, except /user/login

### DATABASE && DATA

- Create a cluster
- Install mongoose
- Connect your database with the app
- Call the connectDB function
- Create a userSchema and user model
- Create a POST/signup api to add data to database
- Push some documents using api calls from postman

### APIS

- Difference between js and json
- Add the express.json()
- Make the signup api dynamic to receive data from enduser
- user.finOne() with duplicate emailIds which one will be returned !!
- Build a Get user by email
- Feed API get all the users from database
- API - Get users by Id
- API - Create a delete user API
- API - Create a Update user API
- Explore the mongoose documentation specially Models
- what are options in a model

### DATA SANITIZATION && SCHEMA VALIDATION

- Database checks
- Explore schema type options fron the documentations
- add a required unique lowercase uppercase min minlength trim default
- Create a custom validate function for gender
- Improve the db schema
- Put all appropriate validations on each field
- Add timestamps to the schema
- API level valdiations on signup post and update patch request
- API Validations for each fields
- Install validator
- Explore validator library functions
- Use validator library function and use it for password, emailId, photoUrl
- Never trust request.body

### Authentication

- Validate data in Signup api
- Create a helper function utility function
- install bcrypt library
- create a password hash using bcrypt.hash()
- Save the user with encrypted password
- Create Login API
- Write the logic by your own
- compare pasword and throw errors if email or password is invalid

### JWT

- Install cookie-parser
- just send a dummy cookie to user
- Create a get /profile api and check if you get the cookie back
- res.cookie
- install json web token
- Create a jwt token
- implement json web token
- after email and password validation create a jwt token and send it back to user inside cookies
- Read the cookie inside user profile and find out who is logged in
- user auth middleware
- Add the authUser middleware in profile api and a new sendConnecitonRequest API
- Set the expiry of jwt token and cookies to 7 days
- Create user schema mthod to get jwt
- Create user schema method to compare password(passwordInputByUser)

### ROUTER AND REFACTORING

- Explore the tinder APIS
- Create a list of all apis you can think of in Dev connect
- Group multiple routes under respective routers
- Read documentation for express.Router()
- Create Routes folder for managing auth,profile,requestRouter
- Create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST/logout api and test it
- Create PATCH /profile/edit api and test it
- Create PATCH /profile/password api and test it (Forgot password api )
- Make sure you validate all data in every POST, PATCH, Apis

### COMPOUND INDEX AND LOGICAL DB QUERING

- Create a connection request schema
- Add proper validation
- Send connetion request api
- proper validation of data
- Think about corner cases and handle them
- $or query and $and query
- Read the article [URL](https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/)
- schema.pre
- schema.index
- Read more about indexes in mongodb
- Why do we need index in DB ?
- Advantages and disadvantages of creating index

### MORE APIS LOGIC BUILDING

- Write code with proper validation with connection accept or reject
- Thought Process -> POST VS GET APIS
- POST -> Can put something inside my database i will verify what needs to be put inside my database
- GET -> Database should be safe we need to be sure we are sending whats requested nothing extra

- Ref (replacement for join in sql ) in the schema
- Populate (read about ref and populate )
- Create GET-> API request received with all the checks
- Create GET -> API Users connection or query

### FEED API && PAGINATION

- GET /user/feed api write the logic
- Explore the $nin, $and, $ne, other query operators

### NOTES

- ## Theory of pagination

- /user/feed?page=1&limit=10 => First 10 users
- / user/feed?page=2&limit=10 => 11-20 users
- / user/feed?page=3&limit=10 => 21-30 users
- .skip() & .limit() => mongodb built in functions

**Example**
- .skip(0) & .limit(10) => first 10 users

- Skip formulae => (page-1) * limit
