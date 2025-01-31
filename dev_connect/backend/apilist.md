# DEV CONNECT APIS

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

ConnectionRequestRouter
- POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

user
- GET /user/connections
- GET /user/requests/received
- GET /user/feed 



Status: ignore , interested , accepted , rejected
