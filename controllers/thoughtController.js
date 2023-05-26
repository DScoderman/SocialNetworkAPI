const {Users, Thoughts } = require("../models")

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
try {
    const getAllThoughts = await Thoughts.find({})
    res.status(200).json(getAllThoughts)
} catch (err) {
    res.status(500).json(err)
}
},
// get one thought
async getThought(req, res) {
    try {
        const getThought = await Thoughts.findOne({_id: req.params.thoughtId})
      if (!getThought) {
        res.status(404).json({message: 'No thought with this id!'})
       } else {
        res.status(200).json(getThought)
       }
     } catch (error) {
        res.status(500).json(error)
}
    
},
// create thought
async CreateThought(req,res)  {
    try {const thought = await Thoughts.create(req.body)
        const user = await Users.findOneAndUpdate(
            { _id: req.body.UsersId },
            { $push: { thoughts: Thoughts._id } },
            { new: true }
        )
    if (!user) {
        res.status(404).json({message: 'Failed to create thought: user does not exist'})
    } else {
        res.status(200).json({message: 'Thought created'})
    }
} catch (error) {
    res.status(500).json(error)
}
},

// update thought
async updateThought(req,res) {
    try {
        const updateThought = await Thoughts.findOneAndUpdate(
            {_id: req.body.ThoughtsId},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        !Thoughts
            ? res.status(404).json({ message: "ID not found" })
            : res.json(Thoughts)
        } catch (err) {
            res.status(500).json({ message: err })
        }
    },

    // deleteThought
    async deleteThought(res,req) {
        try {

        const deleteThought =await Thoughts.findOneandRemove({
             _id: req.body.ThoughtsId})
             if (!deleteThought) {
                return res.status(404).json({message: "Invalid ID for thought"})
             }             
        }
    catch (err) {
        res.status(500).json({message: err})
    }
    },

    // add thought reaction
    async thoughtReactionAdd(res, req) {
        try {

            const thoughtReactionAdd = await Thoughts.findOneAndUpdate(

                {_id: req.params.ThoughtsId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
                )
                if(!thoughtReactionAdd) {
                    res.status(404).json({message: "Error: Reaction not added"})
                } else {
                    res.status(200).json(thoughtReactionAdd)
                } 
                }
                catch (err) {
                    res.status(500).json(err)
                }
            },
    
            // delete reaction
            async thoughtReactionDelete(res, req)  {
            try {

                const thoughtReactionDelete = await Thoughts.findOneAndUpdate(
                    
                    {_id: req.params.ThoughtsId},
                    {$pull: {reactions: {reaction_id: req.body.reaction_id}}},
                    {runValidators: true, new:true}
                    
                );
                if(!thoughtReactionDelete) {
                    res.status(404).json({message: "Error: Reaction not deleted"})
                } else {
                    res.status(200).json(thoughtReactionDelete)
                }
            } catch (err){
            res.status(500).json(err)
            }
        }
}





