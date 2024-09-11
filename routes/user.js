const express = require('express');
const router = express.Router();

const {signUp,login}  = require("../Controllers/Auth");
const { createNewPatient,getPatients} = require("../Controllers/User");

router.post("/login",login);
router.post("/signup",signUp);
router.post("/createNewPatient",createNewPatient);
router.post("/getPatients",getPatients);




module.exports = router;