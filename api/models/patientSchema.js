const mongoose = require('mongoose');

const patient_schema = new mongoose.Schema({
    _id: {type:Number, required:true},
    name: {type:String, required:true},
    address: String,
    birthDate: Date,
    homePhone: String,
    phone: String,
    image:String
});
module.exports= mongoose.model("patients", patient_schema);
