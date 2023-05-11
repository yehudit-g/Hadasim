const express = require("express");
const app = express();
const routes1 = require('./api/routes/patient');
const routes = require('./api/routes/covid');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origion", "*");
    res.header("Access-Control-Allow-Headers", "Origion, X-Requested-With, Content-Type, Accept, Authorization")
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({});
    }
    next();
})

//Routes
app.use('/routes/covid', routes);
app.use('/routes/patient', routes1);

app.use('/uploads', express.static('uploads'));

//If the url is not correct
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

//Manages the errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;