const router = require('express').Router();

const {
    getAllThoughts,
    getThought,
    CreateThought,
    updateThought,
    deleteThought,
    thoughtReactionAdd,
    thoughtReactionDelete,
} = require("../../controllers/thoughtController")

router.route("/").get(getAllThoughts);
module.exports= router