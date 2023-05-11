const mongoose = require('mongoose');


const corona_Details_schema = new mongoose.Schema({
    _id: {type:Number, required:true, ref:'patients'},
    vaccinationDate1:  {type:Date},
    vaccinationDate2:  {type:Date},
    vaccinationDate3:  {type:Date},
    vaccinationDate4:  {type:Date},
    vacProducer1: {type:String},
    vacProducer2: {type:String},
    vacProducer3: {type:String},
    vacProducer4: {type:String},
    positiveResultDate: {type:String},
    recoveryDate: {type:String}
});

module.exports = mongoose.model("coronas", corona_Details_schema);