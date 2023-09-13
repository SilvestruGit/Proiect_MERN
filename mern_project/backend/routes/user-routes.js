const express = require('express');

const userControllers = require('../Controllers/users-controllers');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', userControllers.getAllUsers);

router.post(
    '/signup',
    [
        check('username').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({ min: 4 })
    ],
    userControllers.signup);
router.post('/login', userControllers.login);

module.exports = router;