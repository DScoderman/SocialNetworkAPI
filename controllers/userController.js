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
        if (!updatedUser) {
            res.status(404).json({ message: "No user with this id!" });
          } else {
            res.status(200).json(updatedUser);
    } 
} catch (error) {
    res.status(500).json(error);
}

}
}