const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    register: (req, res) => {
        Users.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json(err));
    },

    login: (req, res) => {
        Users.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: "Invalid Credentials" });
            }

            bcrypt
            .compare(req.body.password, user.password)
            .then((isMatch) => {
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid Credentials" });
                }

                const userToken = jwt.sign(
                {
                    id: user._id,
                },
                process.env.SECRET_KEY
                );

                res.cookie("usertoken", userToken, { httpOnly: true }).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                token: userToken,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Something went wrong" });
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Something went wrong" });
        });
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        Users.findOne()
        .then((users) => {
            res.json(users);
        })
        .catch((err) =>
            res.json({ message: "Something went wrong!", error: err })
        );
    },

    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
        .then((user) => res.json(user))
        .catch((err) =>
            res.status(500).json({ message: "Something went wrong!", error: err })
        );
    },

    updateUser: (req, res) => {
        const userId = req.params.id;
        const updateData = req.body;

        User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
        .then((updatedUser) => {
            if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Something went wrong", error: err });
        });
    },
};
