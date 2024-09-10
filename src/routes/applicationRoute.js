const {createApplication,getApplicationById,getAllApplication,getAllApplicationById,updateApplication} = require('../controllers/ApplicationController')

const router = require("express").Router();

router.post("/createApplication", createApplication);
router.get("/getApplicationById/:id", getApplicationById);
router.get("/getAllApplication", getAllApplication);
router.get("/getAllApplicationById/:id", getAllApplicationById);
router.post("/updateApplication/:id", updateApplication);

module.exports = router;