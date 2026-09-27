/** 
 * Generic middleware to validate req.body against any zod schema
 * @param {import("zod").ZodType} schema 
*/

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
        // eg: {email: ["Invalid email"], password: ['Passwoed must be at least 6 characters']}
        const fieldErrors = result.error.flatten().fieldErrors;

        return res.status(400).json({
            error: "Validation failed",
            details: fieldErrors
        })
    }

    req.body = result.data
    next()
}


module.exports = validate