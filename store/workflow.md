### Store Workflow

- Create a signup route
- Create a model and Schema using mongoose
- Created a schema method to compare password
- hashed the password using bcrypt and stored the hashed password in database
- crated refresh token and accesstoken and stored it inside cookie

## Logout Route

- Created a logout api
- We clear the cookie and verify the token
- Refresh the redis token

## Login Route

- /api/auth/login
- compare password
- Access Token and refresh Token
- Expires in 15m and expires in 7d
- set them in cookie
- save it in redis
- created a refresh token

## Products Routes
- created routes to fetch all the products
- Admin only features
- created two middleware one to make the route protected and the other to check for the role (Admin only )
