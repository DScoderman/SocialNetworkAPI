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
router.route("/").post(CreateThought)
router.route("/").put(updateThought)
router.route("/").delete(deleteThought)



router.route("/:thoughtId").get(getThought)

router.route("/:thoughtId/reactions")
    .post(thoughtReactionAdd)
    .delete(thoughtReactionDelete)


module.exports= router