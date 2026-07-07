const express = require('express')
const router = express.Router()
const User = require('./models/users')

router.get('/users', (req, res) => {
  res.status(200)
  res.send({ message: "Uebung8"})
})

module.exports = router;