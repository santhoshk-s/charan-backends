const Application = require('../Models/applicationModel');
const workshop = require("../Models/workshopModel/Workshopmodel");
const User = require("../Models/userModel");
const Internship = require("../Models/internshipModal");


exports.createApplication = async (req, res, next) => {
  try {
    const intern = await Application.create({ ...req.body });

    return res
      .status(200)
      .json({ message: "Internship created successfully", intern });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getApplicationById = async (req, res) => {
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


exports.getAllApplication = async (req, res) => {
  try {
    const items = await Application.find({});

    if (!items || items.length === 0) {
      return res.status(404).json({ error: "No applications found" });
    }

    const getProductDetails = async () => {
      try {
        const combinedData = await Promise.all(
          items.map(async (item) => {
            const UserItem = await User.findById(item.userId);
            const workshopItem = await workshop.findById(item.applyId);
            const internshipItem = await Internship.findById(item.applyId);

            return {
              ...item._doc, 
              UserItem: UserItem || null,
              workshopItem: workshopItem || null,
              internshipItem: internshipItem || null,
            };
          })
        );
        return combinedData;
      } catch (error) {
        console.error("Error fetching additional details:", error);
        throw error;
      }
    };
    
    const combinedData = await getProductDetails();

    res.status(200).json({ items: combinedData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching application details", error });
  }
};

exports.getAllApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Application.findById(id);

    if (!item) {
      return res.status(404).json({ error: "No application found" });
    }

    const getProductDetails = async () => {
      try {
        const UserItem = await User.findById(item.userId);
        const workshopItem = await workshop.findById(item.applyId);
        const internshipItem = await Internship.findById(item.applyId);

        return {
          ...item._doc, 
          UserItem: UserItem || null, 
          workshopItem: workshopItem || null,
          internshipItem: internshipItem || null,
        };
      } catch (error) {
        console.error("Error fetching additional details:", error);
        throw error;
      }
    };

    const combinedData = await getProductDetails();

    res.status(200).json({ item: combinedData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching application details", error });
  }
};
