var dateCalculator = {
    convertToAd : function (year, month, date) {
        console.log(year + " " + month + " " + date);
        var monthArray = dateProvider.year[year];
        var daysSinceStartOfBikramYear = date - 1;
        var newYearStartedOn = dateProvider.newYearDates[year];
        for ( var i = 0; i < month - 1; i += 1) {
            daysSinceStartOfBikramYear += monthArray[i];
        }
        var newYear = new Date(year - app.DIFF_YEAR, app.APRIL_INDEX, newYearStartedOn);
        newYear.setDate(newYear.getDate() + daysSinceStartOfBikramYear);
        return newYear;
    },
    convertToBikram : function (year, month, date) {
        return new DateValue(app.AD, year, month, date);
    }
};
