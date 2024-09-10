const {createInternship,getInternship} = require('../controllers/internshipController')


const router = require("express").Router();

router.post("/createIntership", createInternship);
router.get("/getInternship", getInternship);

module.exports = router;