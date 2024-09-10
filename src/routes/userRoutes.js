const {
  register,
  login,
  setAvatar,
  getAllUsers,
  logOut,
  getUsersById
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.post("/getUsersById", getUsersById);
 
module.exports = router;
