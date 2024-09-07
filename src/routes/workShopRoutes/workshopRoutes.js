const express=require('express');
const router=express.Router();
const {createWorkshop} =require('../../controllers/workshopController/workShopController');

router.post("/create",createWorkshop);

module.exports=router;