function serverDiv(partialCalc) {
    console.log('dividing');
    return {
        integerOne: Number(partialCalc.integerOne),
        operator: partialCalc.operator,
        integerTwo: Number(partialCalc.integerTwo),
        result: Number(partialCalc.integerOne / partialCalc.integerTwo)
    }
}

module.exports = serverDiv;