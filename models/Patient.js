const mongoose = require('mongoose');

const Patient = new mongoose.Schema({
    PatientId:{
        type:String
    },
    name:{
        type:String,
    },
    Age:{
        type:Number
    },
    slots:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Slot'
    }],

})

module.exports = mongoose.model("Patient",Patient);