const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { restart } = require('nodemon');

// @desc    ADD users
// @route   POST /api/users
// @access Private

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    //Check if user exists
    const userExists = await User.findOne({email});
    
    if(userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access Private

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    //Check for user email
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        //Aquí me quedé
    }
    res.json({message: 'Login user'});
});

// @desc   Get user data
// @route   GET /api/users/me
// @access Private

const getMe = asyncHandler( async (req, res) => {
    res.json({message: 'User data display'});
});

module.exports = {
    registerUser,
    loginUser,
    getMe
};