const capitalize = require('./capitalize');
const months = require('../static/months');

const checkMonthType = (monthInput) => {
    let isMonthName = months.find(checkMonth = (month) => {
        return capitalize(monthInput.toString()) === month;
    });

    if (isMonthName) {
        monthInput = months.indexOf(capitalize(monthInput));
        monthInput;
    }
    return monthInput;
}

module.exports = checkMonthType;