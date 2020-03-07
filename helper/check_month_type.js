const capitalize = require('./capitalize');
const months = require('../static/months');

const checkMonthType = (monthInput) => {
    let isMonthName = months.find(checkMonth = (month) => {
        return capitalize(monthInput.toString()) === month;
    });

    if (isMonthName) {
        console.log("masuk")
        monthInput = months.indexOf(capitalize(monthInput));
        monthInput += 1;
    }
    return monthInput;
}

module.exports = checkMonthType;