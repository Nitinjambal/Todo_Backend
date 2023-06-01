import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/cookie.js";


export const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        status: true,
        users,
    });
};


//Register User
export const RegisterNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                status: false,
                message: "User Already exist"
            })
        }
        const hasedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hasedPassword,
        });
        setCookie(user, res, 201, "User Registerd Succussfully") // to set cookie
    } catch (error) {
        res.status(404).json({
            status: false,
            error,
        });
    }
};


//Login User
export const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "Invalid User or Password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(404).json({
                status: false,
                message: "Invalid User or Password"
            })
        }

        setCookie(user, res, 200, `Welcome back ${user.name}`)
    } catch (error) {
        return res.status(404).json({
            status: false,
            error,
        })
    }
}

//Logout User

export const Logout = (req, res) => {
    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now())
        }).json({
            status: "true",
            message: "Logout Succussfully"
        });
}

//get single user detail
export const getUserProfile = (req, res) => {
    res.status(200).json({
        status: "true",
        user: req.user,
    });
};
