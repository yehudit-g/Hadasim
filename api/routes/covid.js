
const express = require("express");
const router = express.Router();
const Corona = require("../models/coronaSchema");
const Patient = require('../models/patientSchema');
const upload = require('../upload');


//POST
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { _id,
            vaccinationDate1,
            vaccinationDate2,
            vaccinationDate3,
            vaccinationDate4,
            vacProducer1,
            vacProducer2,
            vacProducer3,
            vacProducer4,
            positiveResultDate,
            recoveryDate
        } = req.body;
        //Checks if the patient is registered in the system
        Patient.findById(_id).then((patient) => {
            if (!patient) {
                return res.status(404).json({
                    messege: 'This ID is not registered in the HMO'
                })
            }
            
            //Checks the Dates
            let _recoveryDate = new Date(recoveryDate);
            let _positiveResultDate = new Date(positiveResultDate)
            if (_recoveryDate > _positiveResultDate) {
                return res.status(404).json({
                    messege: 'error: The recoveryDate cannot be greater than the positiveResultDate'
                })
            }
            // if ((vaccinationDate3!=null&&vaccinationDate4 < vaccinationDate3) || (vaccinationDate2!=null&&vaccinationDate3 < vaccinationDate2) || (vaccinationDate1!=null&&vaccinationDate2 < vaccinationDate1) ) {
            //     return res.status(404).json({
            //         messege: 'error: The vaccination Dates should be in order'
            //     })
            // }

            var newCorona = new Corona({
                _id,
                vaccinationDate1,
                vaccinationDate2,
                vaccinationDate3,
                vaccinationDate4,
                vacProducer1,
                vacProducer2,
                vacProducer3,
                vacProducer4,
                positiveResultDate,
                recoveryDate
            });

            return newCorona.save()
        }).then(() => {
            res.status(200).json({
                message: "corona data added successfully"
            })
        })
    }
    catch {
        res.status(500).json({
            message: "ERROR: incorect value"
        })
    }
});



//GET by ID
router.get('/:coronaID', (req, res) => {
    try {
        const coronaID = req.params.coronaID;

        Corona.findById(coronaID).then((covid) => {
            res.status(200).json({
                covid
            })
        })
    }
    catch {
        res.status(500).json({
            message: "error"
        })
    }
});

//GET ALL
router.get('/', upload.single('image'), (req, res) => {
    try {
        Corona.find().then((coronas) => {
            res.status(200).json({
                coronas
            })
        })
    }
    catch {
        res.status(500).json({
            message: "error"
        })
    }
});

module.exports = router;