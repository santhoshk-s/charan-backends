const multer = require("multer");
const mongoose = require("mongoose");
const workshop = require("../../Models/workshopModel/Workshopmodel");

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

      const { workshopname, date, duration, location, abouttheEvent, amount,language } =
        req.body;

        const uploadStream = bucket.openUploadStream(req.file.originalname);
      uploadStream.end(req.file.buffer);

      uploadStream.on("finish", async () => {
        const newWorkshop = new workshop({
          logo: `uploads/${req.file.originalname}`,
          workshopname,
          date,
          duration,
          location,
          abouttheEvent,
          amount,
          language,
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
    res
      .status(500)
      .json({ error: "Error saving workshop", details: error.message });
  }
};

exports.getWorkshops = async (req, res) => {
  try {
    const workshops = await workshop.find();
    res.status(200).json({ workshops });
  } catch (error) {
    console.error("Error fetching workshop:", error);
    res
      .status(500)
      .json({ error: "Error fetching workshop", details: error.message });
  }
};

// Get an image by filename
exports.getImage = (req, res) => {
  const { filename } = req.params;

  const downloadStream = bucket.openDownloadStreamByName(filename);

  downloadStream.on("data", (chunk) => {
    res.write(chunk);
  });

  downloadStream.on("end", () => {
    res.end();
  });

  downloadStream.on("error", (error) => {
    res.status(404).json({ error: "Image not found" });
  });
};
exports.getWorkshopById = async (req, res) => {
  try {
    const item = await workshop.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "workshop not found" });
    }
    res.status(200).json({ item });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workshop details', error });
  }
};

