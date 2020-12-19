const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))

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




    function serverPlus(partialCalc) {
        console.log('adding');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerTwo),
            result: Number(partialCalc.integerOne) + Number(partialCalc.integerTwo)
        }
    }

    function serverMinus(partialCalc) {
        console.log('subtracting');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerTwo),
            result: Number(partialCalc.integerOne - partialCalc.integerTwo)
        }
    }

    function serverTimes(partialCalc) {
        console.log('multiplying');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerTwo),
            result: Number(partialCalc.integerOne * partialCalc.integerTwo)
        }
    }

    function serverDiv(partialCalc) {
        console.log('dividing');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerTwo),
            result: Number(partialCalc.integerOne / partialCalc.integerTwo)
        }
    }

    function toHistory(fullCalc) {
        calcHistory.push(fullCalc)
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