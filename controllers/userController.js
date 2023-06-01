const {Types} = require('mongoose');
const {Users, Thoughts} = require('../models');

module.exports ={
async getUsers(req, res) {
   try {
  const response = await Users.find()
    res.status (200).json(response)
} catch (err) {
    res.status(500).json({message: err})
}
},

async getSingleUser(req,res) {
    try {
        const singleUser = await Users.findOne({_id: req.params.userId})
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
        if (!singleUser) {
            res.status(404).json({message: "no user with this id"})
        } else {
            res.status(200).json(singleUser)
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
},

// UPDATE USER
async updateUser(req, res) {
    try {
        const updateUser = await Users.findOneAndUpdate(
            { _id: req.body.UsersId },
            { $set: req.body },
            { new: true }
        );
        if (!updateUser) {
            res.status(404).json({ message: "No user with this id!" });
          } else {
            res.status(200).json(updateUser);
    } 
} catch (error) {
    res.status(500).json(error);
}

},
async createUser(req,res) {
    try {
        const createUser = await Users.create(req.body)
        if (!createUser) {
            res.status(404).json({message: "user not created"})
        } else {
            res.status(200).json(createUser)
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
},
async deleteUser(req, res) {
    try {
        const userData = await Users.findOneAndRemove({ _id: req.body.userId })

        if (!userData) {
            return res.status(404).json({ message: "No user with that ID" }) 
        }

        const thoughtData = await Thoughts.deleteMany(
            { username: userData.username }
        )

        !thoughtData 
        ? res.status(404).json({ message: "User deleted but no thoughts found" }) 
        : res.json("User successfully deleted")

    } catch (err) {
        res.status(500).json({ message: err })
    }
},
async deleteUser(req, res) {
    try {
        const userData = await Users.findOneAndRemove({ _id: req.body.userId })

        if (!userData) {
            return res.status(404).json({ message: "No user with that ID" }) 
        }

        const thoughtData = await Thoughts.deleteMany(
            { username: userData.username }
        )

        !thoughtData 
        ? res.status(404).json({ message: "Thoughts not found" }) 
        : res.json("User successfully deleted")

    } catch (err) {
        res.status(500).json({ message: err })
    }
},

}