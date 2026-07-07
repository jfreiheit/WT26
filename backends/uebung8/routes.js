const express = require('express');
const router = express.Router();
const User = require('./models/users');

    // get all users
    router.get('/users', async(req, res) => {
        const allUsers = await User.find();
        console.log(allUsers);
        res.send(allUsers);
    });

	// post one user
	router.post('/users', async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;
	  const user = await User.findOne({
      $or: [
        { username: username },
        { email: email }
      ]
    });
    if(!user) {
      const newUser = new User({
	        username: username,
	        password: req.body.password,
	        email: email,
	        role: req.body.role
	    })
	    await newUser.save();
	    res.send(newUser);
    } else {
      res.status(400);
      res.send({ 
        message: "username and/or email already exist(s)"
      })
    }
	});

    // get one user via username
	router.get('/users/:name', async(req, res) => {
	    const user = await User.findOne({ username: req.params.name });
	    console.log(req.params);
	    if(user) {
	        res.send(user);
	    } else {
	        res.status(404);
	        res.send({
	            error: "User does not exist!"
	        });
	    }
	})

  // delete one user via id
  router.delete('/users/:id', async(req, res) => {
      try {
          await User.deleteOne({ _id: req.params.id })
          res.status(204).send()
      } catch {
          res.status(404)
          res.send({ error: "User does not exist!" })
      }
  }); 

  // update one user
router.put('/users/:id', async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (req.body.username) {
            user.username = req.body.username
        }

        if (req.body.password) {
            user.password = req.body.password
        }

        if (req.body.email) {
            user.email = req.body.email
        }

        if (req.body.role) {
            user.role = req.body.role
        }

        await User.updateOne({ _id: req.params.id }, user);
        res.send(user)
    } catch {
        res.status(404)
        res.send({ error: "User does not exist!" })
    }
});

module.exports = router;
