const request = require("supertest")
const app = require("../app")
const User = require("../models/User")


describe("Authentication & Security Integration Tests", () => {
    // Health CHeck
    it("GET /health should return 200 OK", async () => {
        const res = await request(app).get("/health")
        expect(res.statusCode).toBe(200)
        expect(res.body.status).toBe("ok")
    })

    // User Registration (Happy Path)
    it("POST /api/auth/register should create a new user and not return the password", async () => {
        const res = await request(app).post("/api/auth/register").send({
            username: "alice_dev",
            email: "alice@example.com",
            password: "password123",
            role: "user"
        })
        expect(res.statusCode).toBe(201);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.username).toBe("alice_dev");
        expect(res.body.user.email).toBe("alice@example.com")
        // Passwod should never be exposed in the response
        expect(res.body.user.password).toBeUndefined()


        // Verify user was actually stored in the in-memory database
        const dbUser = await User.findOne({ email: "alice@example.com" })
        expect(dbUser).not.toBeNull()


    })
    // User login & cookie issuance
    it("POST /api/auth/login should authenticate and set httpOnly auth cookies", async () => {
        // First register user
        await request(app).post("/api/auth/register").send({
            username: "charlie_test",
            email: "charlie@example.com",
            password: "password123",
            role: "employer"
        })
        // Then Attempt login
        const res = await request(app).post("/api/auth/login").send({
            email: "charlie@example.com",
            password: "password123"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body.user.username).toBe("charlie_test")

        // Verify that httpOnly cookies were sent in the headers
        const cookies = res.headers["set-cookie"]
        expect(cookies).toBeDefined()
        const cookieString = cookies.join("; ")
        expect(cookieString).toContain("token=")
        expect(cookieString).toContain("refreshToken=")
    })
    // Route Protection Middleware
    it("GET /api/protected should return 401 if no token is provided", async () => {
        const res = await request(app).get("/api/protected")
        expect(res.statusCode).toBe(401)
        expect(res.body.error).toBeDefined()
    })

})