const express = require("express");
const router = express.Router();
const Patient = require("../models/patientSchema");
const upload = require('../upload');

//GET by ID
router.get('/:patientID', (req, res) => {
    const patientID = req.params.patientID;

    Patient.findById(patientID).then((patient) => {
        res.status(200).json({
            patient
        })
    }).catch(error => {
        res.status(500).json({
            error
        })
    })
});

//GET ALL
router.get('/', (req, res) => {
    Patient.find().then((patients) => {
        res.status(200).json({
            patients
        })
    }).catch(error => {
        res.status(500).json({
            error
        })
    })
});

//POST
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { _id, name, address, birthDate, homePhone, phone } = req.body;
        const { path: image } = req.file;

        if (birthDate > new Date()) {
            return res.status(404).json({
                messege: 'error: The birthDate is in the future'
            })
        }

        var newPatient = new Patient({
            _id, name, address, birthDate, homePhone, phone, image: image.replace('\\', '/')
        });

        res.json(await newPatient.save().then(() => {
            res.status(200).json({
                message: "patient added successfully"
            })
        }))
    }
    catch {
        res.status(500).json({
            message: "ERROR: incorect value"
        })
    }
});

module.exports = router;