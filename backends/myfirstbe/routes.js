const express = require('express');
const router = express.Router();
const Member = require('./models/members');

// eine GET-Anfrage
router.get('/', async(req, res) => {
    const allMembers = await Member.find();
    console.log(allMembers);
    res.status(200)
    res.send(allMembers);
});

// post one member
router.post('/', async(req, res) => {
    const newMember = new Member({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        ipaddress: req.body.ipadresse
    })
    await newMember.save();
    res.status(201)
    res.send(newMember);
});

// get one member via id
router.get('/:id', async(req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id });
        // console.log('parameter name: ', req.params.name);
        res.status(200)
        res.send(member);
    } catch {
        res.status(404);
        res.send({
            error: "Member does not exist!"
        });
    }
})

// delete one member via id
router.delete('/:id', async(req, res) => {
    try {
        const result = await Member.deleteOne({ _id: req.params.id })
        res.status(204)
        res.send()
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
});

// update one member
router.put('/:id', async(req, res) => {
    try {
        const member = await Member.findOne({ _id: req.params.id })

        if (req.body.firstname) member.firstname = req.body.firstname
        if (req.body.lastname)  member.lastname = req.body.lastname
        if (req.body.email)     member.email = req.body.email
        if (req.body.ipaddress) member.ipaddress = req.body.ipaddress

        await Member.updateOne({ _id: req.params.id }, member)
        res.status(200)
        res.send(member)
    } catch {
        res.status(404)
        res.send({ error: "Member does not exist!" })
    }
})

module.exports = router;