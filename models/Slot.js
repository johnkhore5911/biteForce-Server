const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  BilateralLeft: {
    type: [Number], 
    // required: true
  },
  BilateralRight: {
    type: [Number], 
    // required: true
  },
  UnilateralLeft: {
    type: [Number], 
    // required: true
  },
  UnilateralRight: {
    type: [Number], 
    // required: true
  },
  Incisors: {
    type: [Number], 
    // required: true
  },
  MaxBilateralLeft: {
    type: Number, 
    // required: true
  },
  MaxBilateralRight: {
    type: Number, 
    // required: true
  },
  MaxUnilateralLeft: {
    type: Number, 
    // required: true
  },
  MaxUnilateralRight: {
    type: Number, 
    // required: true
  },
  MaxIncisors: {
    type: Number, 
    // required: true
  }
});


module.exports = mongoose.model("Slot", SlotSchema);

