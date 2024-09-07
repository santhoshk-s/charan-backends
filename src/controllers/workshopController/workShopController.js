const multer = require("multer");
const mongoose = require("mongoose");
const workshopModel = require("../../Models/workshopModel/Workshopmodel");

let bucket;
mongoose.connection.once("open", () => {
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: "charanStorage",
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

exports.createWorkshop = async (req, res) => {
  try {
    upload.single("logo")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { workshopname, date, duration, location, abouttheEvent, amount } =
        req.body;

      const uploadStream = bucket.openUploadStream(req.file.originalname);
      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", async () => {
        const newWorkshop = new workshopModel({
          logo: `uploads/${req.file.originalname}`,
          workshopname,
          date,
          duration,
          location,
          abouttheEvent,
          amount,
          logoId: uploadStream.id,
        });

        const saveWorkshop = await newWorkshop.save();

        res.status(201).json({
          message: "Workshop added successfully",
          workshop: saveWorkshop,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Error saving workshop", details: error.message });
  }
};
