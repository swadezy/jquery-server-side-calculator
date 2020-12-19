const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'))

let calcHistory = [{
    integerOne: 3,
    operator: '+',
    integerTwo: 4,
    result: 7
}];

let historyObj

app.post('/calc', (req, res) => {
    let receivedCalc = req.body;
    console.log('received', receivedCalc);

    if (receivedCalc.operator === 'plus') {
        historyObj = serverPlus(receivedCalc);
    }
    if (receivedCalc.operator === 'minus') {
        historyObj = serverMinus(receivedCalc);
    }
    if (receivedCalc.operator === 'times') {
        historyObj = serverTimes(receivedCalc);
    }
    if (receivedCalc.operator === 'div') {
        historyObj = serverDiv(receivedCalc);
    }
    toHistory(historyObj)




    function serverPlus(partialCalc) {
        console.log('adding');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerOne),
            result: Number(partialCalc.integerOne + partialCalc.integerOne)
        }
    }

    function serverMinus(partialCalc) {
        console.log('subtracting');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerOne),
            result: Number(partialCalc.integerOne - partialCalc.integerOne)
        }
    }

    function serverTimes(partialCalc) {
        console.log('multiplying');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerOne),
            result: Number(partialCalc.integerOne * partialCalc.integerOne)
        }
    }

    function serverDiv(partialCalc) {
        console.log('dividing');
        return {
            integerOne: Number(partialCalc.integerOne),
            operator: partialCalc.operator,
            integerTwo: Number(partialCalc.integerOne),
            result: Number(partialCalc.integerOne / partialCalc.integerOne)
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