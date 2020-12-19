const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

const serverPlus = require('./modules/serverplus.js')
const serverMinus = require('./modules/serverminus.js')
const serverTimes = require('./modules/servertimes.js')
const serverDiv = require('./modules/serverdiv.js')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))

// defining history array and individual history object to push into array
let calcHistory = [];
let historyObj

app.post('/calc', (req, res) => {
    let receivedCalc = req.body;
    console.log('received', receivedCalc);

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
    toHistory(historyObj)


    function toHistory(fullCalc) {
        calcHistory.unshift(fullCalc)
    }

    res.sendStatus(201)



});


app.get('/calc', (req, res) => {
    console.log('in server get');
    res.send(calcHistory)
});









app.listen(PORT, () => {
    console.log('Server is running on PORT', PORT);

})