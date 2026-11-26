const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

let mongoServer;


// Before all tests start: spin up MongoDB in RAM and connect mongoose

beforeAll(async () => {
    process.env.NODE_ENV = "test";
    process.env.JWT_SECRET = "test_jwt_secret_key_12345";
    process.env.REFRESH_SECRET = "test_refresh_secret_key_12345";

    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    await mongoose.connect(uri)

})
// After each test runs: wipe collections so every test starts with fresh, clean database

afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
        await collections[key].deleteMany({})
    }
})

// After all tests finish: close Mongoose and stop the in-memory server

afterAll(async () => {
    await mongoose.disconnect()

    if (mongoServer) {
        await mongoServer.stop()
    }
})