const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

require('dotenv').config();
const SECRET = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');
const { getUserByUsername, createUser,getOrdersByUser,getCartByUser} = require('../db');
const {  requireUser } = require('./utils');



// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { 
        username, 
        password,
        firstname,
        lastname,
        phone,
        email,
        addressline1,
        addressline2 } = req.body;

    if (password.length < 8) {
        console.error('Password must be at least 8 characters long');

        return res.status(400).json({
            name: 'PasswordTooShortError',
            error: 'PasswordTooShortError',
            message: 'Password too short!',
        });
    };

    try {
        // Check if username exists
        const existingUser = await getUserByUsername(username);

        if (existingUser) {
            return res.status(409).json({
                name: 'UserTakenError',
                error: 'UserTakenError',
                message: `User ${username} is already taken!`,
            });
        };

        const newUser = await createUser({ 
            username, 
            password,
            firstname,
            lastname,
            phone,
            email,
            addressline1,
            addressline2,
            isRegistered: true });

            if (newUser) {
                const token = jwt.sign({ id: newUser.id }, SECRET, { expiresIn: '24h' });

                res.status(201).json({
                    message: 'User registered successfully',
                    token: token,
                    user: {
                        id: newUser.id,
                        username: newUser.username,
                    }
                })
            };
    } catch (error) {
        next(error);
    }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (!user) {
            res.status(401).json({
                error: 'InvalidCredentialsError',
                message: 'Invalid username or password!',
            });
        } else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);

            if (!isPasswordCorrect) {
                res.status(401).json({
                    error: 'InvalidCredentialsError',
                    message: 'Invalid username or password',
                });
            } else {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                }, SECRET, { expiresIn: '24h' });

                res.status(200).json({
                    message: `You're logged in!`,
                    token: token,
                    user: {
                        id: user.id,
                        username: user.username,
                    },
                });
            }
        };
    } catch (error) {
        next(error);
    }
});

// // GET /api/users/me
// usersRouter.get('/me', requireUser, async (req, res, next) => {
//     try {
//         const { id, username } = req.user;
//         res.status(200).json({
//             id: id,
//             username: username,
//         });
//     } catch (error) {
//         next(error);
//     }
// });

usersRouter.get("/me", requireUser, async (req, res, next) => {
    try {
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });

// GET /api/users/:username/orders
usersRouter.get('/:username/orders', requireUser, async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                error: 'UserNotFoundError',
                message: `User ${username} not found!`,
            });
        };

        const orders = req.user.username === username ? await getOrdersByUser(username) : null;

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

// GET /api/users/:username/cart
usersRouter.get('/:username/cart', requireUser, async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await getUserByUsername(username);

        if (!user) {
            return res.status(404).json({
                error: 'UserNotFoundError',
                message: `User ${username} not found!`,
            });
        };

        const cart = req.user.username === username ? await getCartByUser(username) : null;

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
});




module.exports = usersRouter;

// usersRouter.get('/:username/orders', requireUser, async (req, res, next) => {
//     const { username } = req.params;
//     try {
        
//         const user = await getUserByUsername(username);
//         if (req.user.username === username) {
//           const orders = await getOrdersByUser(username);
//           res.send(orders);
//         } else {
//           res.status(403);
//           next({
//             error: "404",
//             message: "User Not Found",
//             name: "404",
//           });
//         }
//     } catch (error) {
//         next(error);
//     }
// });
