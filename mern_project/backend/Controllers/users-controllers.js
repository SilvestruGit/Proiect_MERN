const Http_Error = require("../Models/http-error");
const uuid = require('uuid').v4;
const { validationResult } = require('express-validator');

const DUMMY_USERS = [
    {
        'id': 1,
        'username': 'Tony',
        'email': 'tony@gmail.com',
        'password': '1234'
    },
    {
        'id': 2,
        'username': 'Emma',
        'email': 'emma@gmail.com',
        'password': 'abcd'
    }
];

const getAllUsers = (req, res, next) => {
    res.status(200).json({ users: DUMMY_USERS });
}

const signup = (req, res, next) => {

    const validatipnErrors = validationResult(req);

    if (!validatipnErrors.isEmpty()) {
        throw new Http_Error('Inputs not valid!', 422);
    }

    const { username, email, password, id } = req.body;
    const newUser = { username, email, password, id: uuid() };

    if (DUMMY_USERS.find(user => user.email === newUser.email)) {
        throw new Http_Error("Email elready in use!", 422);
    }

    DUMMY_USERS.push(newUser);

    res.status(201).json({ newUser });
}

const login = (req, res, next) => {
    const { email, password } = req.body;
    const loginUser = DUMMY_USERS.find(user => {
        return user.email === email && user.password === password;
    })

    if (!loginUser) {
        throw new Http_Error("Could not login user", 401);
    }

    res.json({ message: 'Logged in!' });
}

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;