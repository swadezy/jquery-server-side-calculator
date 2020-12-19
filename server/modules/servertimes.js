// calculates result & creates new object based on multiplication operator
function serverTimes(partialCalc) {
    console.log('multiplying');
    return {
        integerOne: Number(partialCalc.integerOne),
        operator: partialCalc.operator,
        integerTwo: Number(partialCalc.integerTwo),
        result: Number(partialCalc.integerOne * partialCalc.integerTwo)
    }
}

module.exports = serverTimes;