const {
  register,
  login,
  setAvatar,
  getAllUsers,
  logOut,
  getUsersById,
  editProfile
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logOut);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.post("/getUsersById", getUsersById);
router.post("/editProfile/:id", editProfile);
 
module.exports = router;
