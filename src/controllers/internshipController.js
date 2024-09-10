const Internship = require("../Models/internshipModal");

exports.createInternship = async (req, res, next) => {
    try {
        const intern = await Internship.create({ ...req.body });

        return res
            .status(200)
            .json({ message: "Internship created successfully", intern });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.getInternship = async (req, res) => {
    try {
        const intern = await Internship.find();
        res.status(200).json({ intern });
    } catch (error) {
        console.error("Error fetching workshop:", error);
        res
            .status(500)
            .json({ error: "Error fetching workshop", details: error.message });
    }
};
