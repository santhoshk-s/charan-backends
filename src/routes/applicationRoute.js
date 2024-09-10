const {createApplication,getApplicationById,getAllApplication,getAllApplicationById} = require('../controllers/ApplicationController')

const router = require("express").Router();

router.post("/createApplication", createApplication);
router.get("/getApplicationById/:id", getApplicationById);
router.get("/getAllApplication", getAllApplication);
router.get("/getAllApplicationById/:id", getAllApplicationById);

module.exports = router;