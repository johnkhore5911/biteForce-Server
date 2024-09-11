const express = require('express');
const router = express.Router();

const {savePatientSlot,getPatientSlot,getPatientDetails,getPatientId} = require("../Controllers/Patients")
router.post("/savePatientSlot",savePatientSlot);
router.post("/getPatientSlot",getPatientSlot);
router.post("/getPatientDetails",getPatientDetails);
router.post("/getPatientId",getPatientId);






module.exports = router;