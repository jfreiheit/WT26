const express = require('express');
const router = express.Router();
const User = require('../models/user')

// get all users
router.get('/', async(req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.send(allUsers);
});

// post one user
router.post('/', async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;

    let user = await User.findOne({ 
        $or: [
        { username: username },
        { email: email }
    ] });
    console.log('user nach or : ', user)
    if(user) {
        res.status(400)
        res.send({ message : "username and/or email already exists"})
    }
    else 
    {
        const newUser = new User({
            username: username,
            password: req.body.password,
            email: email,
            role: req.body.role
        })
        await newUser.save();
        res.status(201);
        res.send(newUser);
    }
});

// get one user via username
router.get('/:name', async(req, res) => {

        const user = await User.findOne({ username: req.params.name });
        if(user)
        {
            res.status(200)
            res.send(user);
        } else {
            res.status(404);
            res.send({
                error: "User does not exist!"
            });
        }
})


// delete one user via id
router.delete('/:id', async(req, res) => {

    const result = await User.deleteOne({ _id: req.params.id })
    if(result.deletedCount == 1 ) {
        res.status(204)
        res.send()
    } else {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

module.exports = router;