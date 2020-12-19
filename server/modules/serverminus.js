// calculates result & creates new object based on subtraction operator
function serverMinus(partialCalc) {
    console.log('subtracting');
    return {
        integerOne: Number(partialCalc.integerOne),
        operator: partialCalc.operator,
        integerTwo: Number(partialCalc.integerTwo),
        result: Number(partialCalc.integerOne - partialCalc.integerTwo)
    }
}

module.exports = serverMinus;