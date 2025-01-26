import { generateToken } from "../lib/utils.js"
import User from "../models/users.model.js"
import bcrypt from "bcryptjs"
import cloudinary from '../lib/cloudinary.js'

/*
* Sign Up Function
* Params :
*    req : request object { fullName, email, password, location, phone }
*    res : response object
* Handles the sign up of a new user
* Status sent on response:
*   201 : New User Created Successfully
*   400 : Wrong Data passed in the request
*   500 : internal server error (to debug if there is a wrong in system)
*/

export const signup = async (req, res) => {
    //* Extract info from body
    const { fullName, email, password, location, phone } = req.body
    try {
        //* Check if one of the parameters are not passed
        if (!fullName || !email || !password || !location || !phone) {
            return res.status(400).json({
                message: "Not All fields Are Provided"
            })
        }

        //* Check if password length is less than 8
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password Must Be At Least 8 Characters"
            })
        }

        //* check if the user already exists
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "Email Already Exists"
            })
        }

        //* hash passowrd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //* add the new user
        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            location: location,
            phone: phone
        })

        //* if created in the database
        if (newUser) {
            //* Generate a JWT Token For the user
            generateToken(newUser._id, res)

            //* save the user in the database
            await newUser.save()

            //* respond to the client with sucess
            res.status(201).json({
                _id: newUser._id,
                fullName: fullName,
                email: email,
                location: location,
                phone: phone
            })
        } else {
            return res.status(400).json({
                message: "Invalid User Data"
            })
        }

    } catch (error) {
        //* DEBUG For Server Errors
        console.log("[Sign Up Controller Error] : ", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

/*
* Login Function
* Params :
*    req : request object {email, password}
*    res : response object
* Handles the sign up of a new user
* Status sent on response:
*   201 : New User Created Successfully
*   400 : Wrong Data passed in the request
*   500 : internal server error (to debug if there is a wrong in system)
*/

export const login = async (req, res) => {
    //* Extract info from body
    const { email, password } = req.body
    try {
        //* Check if user is in the system
        const userFind = await User.findOne({ email })
        if (!userFind) {
            return res.status(400).json({
                message: "Invalid Creditials"
            })
        }

        //* Check if user password is in the system
        const isCorrectPassword = await bcrypt.compare(password, userFind.password)

        if (!isCorrectPassword) {
            return res.status(400).json({
                message: "Invalid Creditials"
            })
        }

        //* User is correct generate token for him
        generateToken(userFind._id, res)

        return res.status(200).json({
            _id: userFind._id,
            fullName: userFind.fullName,
            email: userFind.email,
            location: userFind.location,
            phone: userFind.phone,
            profilePic: userFind.profilePic
        })

    } catch (error) {
        console.log("[Login Controller Error] : ", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

/*
* Logout Function
* Params :
*    req : request object {email, password}
*    res : response object
* Handles the sign up of a new user
* Status sent on response:
*   201 : New User Created Successfully
*   500 : internal server error (to debug if there is a wrong in system)
*/

export const logout = (req, res) => {
    try {
        //* Remove cookie from user
        res.cookie("jwt", "", {
            maxAge: 0,  // Expire immediately to delete the cookie
            path: '/'  // Make sure this matches the path where the cookie was set
        });
        res.status(200).json({
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log("[Logout Controller Error] : ", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({
                message: "Profile Picture is required"
            })
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url
        }, {
            new: true
        })

        res.status(200).json(updatedUser)
    } catch (error) {
        //* DEBUG For Server Errors
        console.log("[Update Profile Controller Error] : ", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export const checkAuth = (req, res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        //* DEBUG For Server Errors
        console.log("[Update Profile Controller Error] : ", error.message)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}