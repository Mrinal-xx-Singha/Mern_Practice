const jwt = require("jsonwebtoken")


const isProduction = process.env.NODE_ENV === "production"

const cookieOptions = {
    httpOnly: true,
    sameSite: isProduction ? 'none' : "lax",
    secure: isProduction
}

/***
 * Signs access + refresh tokens, saves refresh token to user documents, and sets cookies on response.
 */

async function issueTokens(res, user) {
    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '15m'
    })

    const refreshToken = jwt.sign({
        id: user._id
    },

        process.env.REFRESH_SECRET,
        { expiresIn: "7d" }
    )

    user.refreshToken = refreshToken;
    await user.save()


    res.cookie("token", accessToken, cookieOptions)
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        path: "/api/auth/refresh-token",
    })
}


module.exports = { issueTokens, cookieOptions }