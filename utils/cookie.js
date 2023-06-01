import Jwt from "jsonwebtoken"

export const setCookie = (user, res, statusCode = 200, message) => {
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,

    }).json({
        status: true,
        message,
    });
}