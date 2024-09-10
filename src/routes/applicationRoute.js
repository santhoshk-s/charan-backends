const {createApplication} = require('../controllers/ApplicationController')

const router = require("express").Router();

router.post("/createApplication", createApplication);
// router.get("/getInternship", getInternship);

module.exports = router;