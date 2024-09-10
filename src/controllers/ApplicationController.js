const Application = require('../Models/applicationModel');


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