import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 3600 * 1000,
        httpOnly: true,                                 //! prevent XSS Attacks cross-site scripting attacks
        sameSite: "strict",                             //! prevent CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"  //! Check if the request Https (more secure)
    })

    return token
}