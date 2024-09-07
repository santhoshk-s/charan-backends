const express=require('express');
const router=express.Router();
const {createWorkshop,getImage,getWorkshops,getWorkshopById} =require('../../controllers/workshopController/workShopController');

router.post("/create",createWorkshop);
router.get('/list-all', getWorkshops);
router.get('/:id', getWorkshopById);
router.get('/workshop-image/:filename', getImage);
module.exports=router;