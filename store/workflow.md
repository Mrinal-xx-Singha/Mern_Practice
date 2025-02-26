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
- Created createProduct controller function to create a product
- Cloudinary for image upload 
- Save the image in cloudinary 
- Delete a product 
    - delete image from cloudinary
    - delete and update the database
- Created a getRecomendedProducts api to get recommended products this route is accessable by everyone
- Created a getProductsByCategory api to get all the products by category like shoes clothes etc.. (Dynamic route for getting individual products)
- Created a toggleFeaturedProduct this is a flag which can be used by admin to make any product featured or unfeature a product from the store
- Update the cache in redis because we have saved it in redis 
- Created a cart route where we can add products to cart ,Remove products from cart , update quantity , get all the details of the products 