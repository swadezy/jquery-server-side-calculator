// sends full calculation object to history array
function toHistory(fullCalc, history) {
    history.unshift(fullCalc)
}

module.exports = toHistory;