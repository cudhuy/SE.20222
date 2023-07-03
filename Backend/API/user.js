const express = require('express')
const router = express.Router();
const { pool } = require('../database/dbinfo')

const jwt = require("jsonwebtoken");
const multer = require("multer");
const { route } = require('./testConnect');

const verifyToken = require('../Services/verify')

// Tao 1 user
router.post('/account', async (req, res, next) => {
    var password = req.body.password;
    //const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.connect();
        await pool.request()
            .input('username', req.body.username)
            .input('password', req.body.password)
            .input('name', req.body.name)
            .input('role', req.body.role)
            .query(`insert into Users(username, password, name, role) 
                    values (@username, @password, @name, @role)`
            )
        const user = req.body
        let token = jwt.sign({ user }, process.env.SECRET, { expiresIn: "10 days" })
        res.json({ user, token, message: "Successful!" })
    } catch (error) {
        res.status(500).json(error)

    }
})
// Lay 1 user auth
router.get('/authUser', verifyToken, async (req, res) => {
    //console.log(req.decoded);
    const username = req.decoded.user.username;
    try {
        await pool.connect();
        const result = await pool.request()
            .input('username', username)
            .query(`select * from Users where username = @username`)
        const user = result.recordset[0];
        if (!user) {
            res.status(403).json({
                success: false,
                message: "Not exist username! ",
            });
        } else {
            res.json(user)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//login
router.post('/login', async (req, res, next) => {
    //console.log('okok');
    const username = req.body.username;
    const password = req.body.password;

    try {
        await pool.connect();
        const result = await pool
            .request()
            .input('username', username)
            .query(`select * from Users 
                where username = @username`)
        const user = result.recordset[0];
        if (!user) {
            res.status(403).json({
                success: false,
                message: "Not exist username! ",
            });
        } else {
            if (password == user.password) {
                let token = jwt.sign(user, process.env.SECRET, { expiresIn: '2 days' });
                res.json({ user, token })
                console.log(user);
            } else {
                res.status(403).json({
                    success: false,
                    message: "Wrong password! ",
                });
            }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/api/login', async (req, res, next) => {
    //console.log('okok');
    // const username = req.body.email;;
    // const password = req.body.password;
    // let userData = {};
    // userData.errCode = 0;
    // userData.errMessage = `OK`;
    // // delete data.password;
    // userData.user = {};
    // resolve(userData)

    // res.status(500).json(error)

    res.status(200).json({
        errCode: 0,
        message: 'OK',
        user: {}
    })
})

module.exports = router;