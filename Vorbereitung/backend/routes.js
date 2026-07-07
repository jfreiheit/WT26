const express = require('express');
const router = express.Router();
const Member = require('./models/members');

// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hello FIW!" });
});

// get all members
router.get('/members', async(req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers);
    res.send(allMembers);
});

// post one member
router.post('/members', async(req, res) => {
    const newMember = new Member({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        ipaddress: req.body.ipaddress
    })
    await newMember.save();
    res.send(newMember);
});

// get one member via id
router.get('/members/:id', async(req, res) => {
    const member = await Member.findOne({ _id: req.params.id });
    console.log(req.params);
    if(member) {
        res.send(member);
    } else {
        res.status(404);
        res.send({
            error: "Member does not exist!"
        });
    }
})

// delete one member via id
router.delete('/members/:id', async(req, res) => {
    try {
        await Member.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch(error) {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});



module.exports = router;
