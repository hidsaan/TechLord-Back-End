const User = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transporter = require("../utils/nodemailer")
const cloudinary = require("../utils/cloudinary")

const registerController = async (req, res) => {
    try {
        //const image = req.file.path;
        const { name, image, email, phone, password, confpassword } = req.body;
        const existingUser = await User.findOne({ email });
        const hashedPassword = await bcrypt.hash(password, 10)
        const confhashedpsw = await bcrypt.hash(confpassword, 10)

        if (name && email && phone && password && confpassword !== "") {
            if (!existingUser) {

                const upload = await cloudinary.uploader.upload(image, {
                    folder: "TechLord ProfilePictures",
                });

                const profilePicUrl = upload.secure_url;

                if (profilePicUrl) {
                    const newUser = new User({ name, email, phone, password: hashedPassword, confpassword: confhashedpsw, profilePicUrl });
                    if (password === confpassword) {
                        await newUser.save();
                        res.status(201).json({ message: "Registration Successful" });
                    }
                    else {
                        res.json({ message: "Confirm Password should be same as Password" });
                    }
                }

                else {
                    res.json({ message: "Couldnt upload image" });
                }

            }

            else {
                res.json({ message: "User Already exists" });
            }


        } else {
            res.json({ message: "All Credentials Required" });
        }


    } catch (error) {
        console.log(error);
    }
};


const loginController = async (req, res) => {

    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });

        if (email !== "" && password !== "") {
            if (findUser) {
                const passverify = await bcrypt.compare(password, findUser.password);

                if (passverify) {

                    const token = await jwt.sign({ appUser: findUser.username, appUserEmail: findUser.email, appUser_id: findUser.id }, 'thepotatoishungry');
                    res.cookie("token", token, { httpOnly: true });

                    res.status(201).json({ message: "Logged in Successfully", token });

                } else {
                    res.json({ message: "Password Incorrect" });
                }
            } else {
                res.json({ message: "User does not exist" });
            }
        } else {
            res.json({ message: "All Credentials Required" });
        }
    } catch (error) {
        //console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

const logoutController = async (req, res) => {
    try {
        const { appUser_id } = req.info;

        const existingUser = await User.findById(appUser_id);

        if (existingUser) {
            res.clearCookie("token");
            res.status(200).json({ message: "Logged Out Succssfully" });
        } else {
            res.json({ message: "User Not Found" });
        }
    } catch (err) {
        console.log(err);
    }

}

const deleteUserController = async (req, res) => {
    try {
        const { appUser_id } = req.info

        const existingUser = await User.findByIdAndDelete(appUser_id);

        if (!existingUser) {
            res.json({ message: "User Does not Exist" });

        } else {
            res.json({ message: "User Deleted Succesfully" });
        }
    } catch (err) {
        console.log(err);
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body
        const userExists = await User.findOne({ email })

        const userId = userExists._id;

        if (!userExists) {
            return res.json({ message: "User Not Found" })
        } else {

            const sendMail = await transporter.sendMail({
                from: "hidsaanmajeed427226@gmail.com",
                to: `${email}`,
                subject: "Password Change",
                text: "Here's the link to reset your password. "
            })

            if (!sendMail) {
                return res.json({ message: "Error sending email. Please enter correct email or try again after some time." })
            }
            else {
                res.json({ message: "We have sent you the password reset link on your reistered email.", userId })

            }
        }


    } catch (error) {

        console.log(error)
    }
}

const updatePasswordController = async (req, res) => {
    try {
        const { UpdatedPassword, ConfirmUpdatedPassWord } = req.body;
        const { userId } = req.query;

        if (UpdatedPassword !== "" && ConfirmUpdatedPassWord !== "") {
            if (UpdatedPassword === ConfirmUpdatedPassWord) {

                const hashedPassword = await bcrypt.hash(newPassword, 10);

                const user = await User.findByIdAndUpdate(userId, {
                    password: hashedPassword,
                });

                const updateUser = await user.save();
                if (updateUser) {
                    res.json({ message: "Password Changed" });
                }
            } else {
                res.json({ message: "Password and Confirm Password should be the same" });
            }
        } else {
            res.json({ message: "All Fields Required" });
        }


    } catch (error) {
        console.log(error);
    }

}

const changePasswordController = async (req, res) => {
    try {
        const { UpdatedPassword, ConfirmUpdatedPassWord } = req.body;
        const { appUser_id } = req.info

        if (UpdatedPassword !== "" && ConfirmUpdatedPassWord !== "") {
            if (UpdatedPassword === ConfirmUpdatedPassWord) {

                const hashedPassword = await bcrypt.hash(newPassword, 10);

                const user = await User.findByIdAndUpdate(appUser_id, {
                    password: hashedPassword,
                });

                const updateUser = await user.save();
                if (updateUser) {
                    res.json({ message: "Password Changed" });
                }
            } else {
                res.json({ message: "Password and Confirm Password should be the same" });
            }
        } else {
            res.json({ message: "All Fields Required" });
        }


    } catch (error) {
        console.log(error);
    }
}

module.exports = { registerController, loginController, logoutController, deleteUserController, forgotPasswordController, updatePasswordController, changePasswordController };
