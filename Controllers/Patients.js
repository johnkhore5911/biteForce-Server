const Patient = require("../models/Patient");
const Slot = require("../models/Slot")

exports.savePatientSlot = async (req, res) => {
    try{
        const {PatientId} = req.body;
        const {BilateralLeft,BilateralRight,UnilateralLeft,UnilateralRight,Incisors,MaxBilateralLeft,MaxBilateralRight,MaxUnilateralLeft,MaxUnilateralRight,MaxIncisors} = req.body;

        const user = await Patient.findById(PatientId);
        console.log("user",user);
        
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Patient not found"
            })
        }

        const newSlot = new Slot({
            BilateralLeft,
            BilateralRight,
            UnilateralLeft,
            UnilateralRight,
            Incisors,
            MaxBilateralLeft,
            MaxBilateralRight,
            MaxUnilateralLeft,
            MaxUnilateralRight,
            MaxIncisors
        })
        
        const savedSlot = await newSlot.save();
        user.slots.push(savedSlot._id);
        await user.save();
        console.log("Saved successfully")

        return res.status(201).json({
            success:true,
            message:`Slot Saved Successfully`,
        });


    }
    catch(error){
        console.error(error);
        console.log("Error while saving the Patient Slot readings")
    }
}

exports.getPatientSlot = async(req,res)=>{
    try{
        const {PatientId} = req.body;
        const user = await Patient.findById(PatientId).populate({
            path:"slots",
            select:"BilateralLeft BilateralRight UnilateralLeft UnilateralRight Incisors MaxBilateralLeft MaxBilateralRight MaxUnilateralLeft MaxUnilateralRight MaxIncisors"
        });
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Patient not found"
            })
        }
        res.status(200).json({
            success: true,
            patients: user.slots,
        });
        
    }
    catch(error){
        console.error(error);
        console.log("Error while Fetching the Patient Slot readings")
    }
}


exports.getPatientDetails = async (req,res)=>{
    //patient id(Input) => patientDetials(Output)
    // input id -> get + populate the slots array  -> return
    try{
        const {PatientId} = req.body;
        const user = await Patient.findById(PatientId)
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Patient not found"
            })
        }
        res.status(200).json({
            success: true,
            patients: user,
        });
        
    }
    catch(error){
        console.error(error);
        console.log("Error while Fetching the Patient Slot readings")
    }
}



exports.getPatientId =async (req,res) =>{
    try{
        const { PatientId, name, Age} = req.body;
        
        
        if(!name || !Age || !PatientId){
            return res.status(400).json({
                success:false,
                message:"Please Fill name and Age"
            })
        }
        const user = await Patient.findOne({name,Age,PatientId});
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // Return the PatientId
        return res.status(200).json({
            success: true,
            UserId: user._id,
        });

    }
    catch(error){
        console.error(error);
        console.log("Error while Fetching the Patient Id")

    }
}