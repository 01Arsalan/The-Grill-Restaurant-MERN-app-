import { userSchema } from "./validationSchema.js"
import ExpressError from "./expessError.js"

export const validateUserData = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(",")
        throw new ExpressError(400, msg)
    } else {
        next()
    }
}

