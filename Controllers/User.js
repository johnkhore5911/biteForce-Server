const User = require("../models/User");
const Patient = require("../models/Patient");

exports.createNewPatient = async (req, res) => {
    try {
      const { userId, PatientId, name, Age } = req.body;
  
      if (!userId || !PatientId || !name || !Age) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }
  
      // Create the new patient
      const newPatient = new Patient({
        PatientId,
        name,
        Age,
      });
  
      // Save the new patient
      const savedPatient = await newPatient.save();
  
      // Fetch the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Push the new patient ID into the user's PatientSlot array
      user.PatientSlot.push(savedPatient._id);
  
      // Save the updated user
      await user.save();
  
      return res.status(201).json({
        success: true,
        message: "Patient added successfully",
        patient: savedPatient,
      });
    } catch (error) {
      console.error("Error while creating new patient", error);
      res.status(500).json({
        success: false,
        message: "Server error while creating new patient",
      });
    }
  };

  
exports.getPatients = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate({
      path: "PatientSlot",
      select: "name Age PatientId slots",
      // populate:{
      //   path:"slots",
      //   model:"Slot"
      // }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      patients: user.PatientSlot,
    });
  } catch (error) {
    console.error("Error while fetching getPatients", error);
    res.status(500).json({
      success: false,
      message: "Server Error while fetching Patients",
    });
  }
};
