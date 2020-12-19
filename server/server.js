const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))

// sourcing in server side evaluation logic
const serverPlus = require('./modules/serverplus.js')
const serverMinus = require('./modules/serverminus.js')
const serverTimes = require('./modules/servertimes.js')
const serverDiv = require('./modules/serverdiv.js')
const toHistory = require('./modules/tohistory.js')

// defining history array and individual history object to push into array
let calcHistory = [];
let historyObj

// receives calculation from client & pushes new object including result into history
app.post('/calc', (req, res) => {
    let receivedCalc = req.body;
    console.log('received', receivedCalc);

    // directing server to correct function based on operator selected in client
    if (receivedCalc.operator === '+') {
        historyObj = serverPlus(receivedCalc);
    }
    if (receivedCalc.operator === '-') {
        historyObj = serverMinus(receivedCalc);
    }
    if (receivedCalc.operator === '*') {
        historyObj = serverTimes(receivedCalc);
    }
    if (receivedCalc.operator === '/') {
        historyObj = serverDiv(receivedCalc);
    }

    // sends newly created full calculation object to be pushed into history
    toHistory(historyObj, calcHistory)
    res.sendStatus(201)
});

// sends history to client
app.get('/calc', (req, res) => {
    console.log('in server get');
    res.send(calcHistory)
});

// runs server
app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);
});