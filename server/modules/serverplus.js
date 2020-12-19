function serverPlus(partialCalc) {
    console.log('adding');
    return {
        integerOne: Number(partialCalc.integerOne),
        operator: partialCalc.operator,
        integerTwo: Number(partialCalc.integerTwo),
        result: Number(partialCalc.integerOne) + Number(partialCalc.integerTwo)
    }
}

module.exports = serverPlus;