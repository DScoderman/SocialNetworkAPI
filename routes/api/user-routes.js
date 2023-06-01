const router = require('express').Router();

const{
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
}  = require("../../controllers/userController")


router.route("/").get(getUsers);
router.route("/").post(createUser)
router.route("/").put(updateUser)
router.route("/").delete(deleteUser)

router.route("/:UserId")
    .get(getSingleUser)


module.exports = router;