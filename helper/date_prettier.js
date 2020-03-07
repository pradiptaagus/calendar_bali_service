const months = require('../static/months');

const datePrettier = (date) => {
    const params = date.split('-');

    date = new Date(params[0], params[1], params[2]);
    let YYYY = date.getFullYear();
    let mm = params[1];
    mm = months[mm > 0 ? mm-1 : mm];
    let dd = date.getDate();

    let endDate = dd + ' ' + mm + ' ' + YYYY;
    return endDate;
}

module.exports = datePrettier;