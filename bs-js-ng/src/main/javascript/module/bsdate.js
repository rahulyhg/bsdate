var app = {
    START_YEAR : 1970,
    END_YEAR : 2100,
    DIFF_YEAR : 57,
    MONTHS_IN_YEAR : 12,
    AD_MAX_DAY : 31,
    DATE_FIX_VAL : 1900,
    APRIL_INDEX : 3,
    BS : 'BS',
    AD : 'AD',
    MILLIS_IN_DAY : 86400000,
    AD_MONTHS : [ "January", "February", "March", "April", "May", "June", "July", "August", "September",
                 "October", "November", "December" ],
    BS_MONTHS : [ "Baisakh", "Jestha", "Ashaad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir",
                 "Poush", "Magh", "Falgun", "Chaitra" ],
    AD_DAYS : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    BS_DAYS : ["Aaitabar", "Sombar", "Mangalbar", "Budhabar", "Bihibar", "Shukrabar", "Sanibar"]
};


var bsCalculator = (function () {
    "use strict";
    var dateProvider, dateCalculator;
    function DateValue(dt, year, month, date, day) {
        this.dt = dt;
        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
    }

    DateValue.prototype.toString = function () {
        return this.year + '-' + this.month + '-' + this.date;
    };

    DateValue.prototype.displayValue = function () {
        if (this.dt === app.AD) {
            return this.dt + ': ' + app.AD_DAYS[this.day] + ' ' + this.date + ' ' + app.AD_MONTHS[this.month] + ', ' + this.year;
        }
        return this.dt + ': ' + app.BS_DAYS[this.day] + ' ' + this.date + ' ' + app.BS_MONTHS[this.month - 1] + ', ' + this.year;
    };

    dateProvider = (function () {
        var non13StartYears, years, newYearDates, dateTotal, startYear, newYearStartDate, totalForYearSinceStart,
            startYearVal, total, year, i;
        years = {
            1970 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1971 : [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30 ],
            // something wrong with this. 12th has 30 days
            1972 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            1973 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            // something wrong with 1974. 04 had 30
            1974 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1975 : [ 31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30 ],
            1976 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            1977 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            1978 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1979 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            // this is a stuff up too, 10 had 29
            1980 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 31 ],
            1981 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            1982 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1983 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            1984 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            1985 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            1986 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1987 : [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            1988 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            1989 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1990 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1991 : [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            // this is a stuff up. calendars say 12th month had 30 days
            1992 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            1993 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1994 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1995 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30 ],
            1996 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            1997 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1998 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            1999 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2000 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2001 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2002 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2003 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2004 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2005 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2006 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2007 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2008 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31 ],
            2009 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2010 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2011 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2012 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            2013 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2014 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2015 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2016 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            2017 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2018 : [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2019 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2020 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2021 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2022 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30 ],
            2023 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2024 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2025 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2026 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2027 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2028 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2029 : [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30 ],
            2030 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2031 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2032 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2033 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2034 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2035 : [ 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31 ],
            2036 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2037 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2038 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2039 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            2040 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2041 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2042 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2043 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            2044 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2045 : [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2046 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2047 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2048 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2049 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30 ],
            2050 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2051 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2052 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2053 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30 ],
            2054 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2055 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2056 : [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30 ],
            2057 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2058 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2059 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2060 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2061 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2062 : [ 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31 ],
            2063 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2064 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2065 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2066 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31 ],
            2067 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2068 : [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2069 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2070 : [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30 ],
            2071 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2072 : [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30 ],
            2073 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31 ],
            2074 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2075 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2076 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30 ],
            2077 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31 ],
            2078 : [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2079 : [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30 ],
            2080 : [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30 ],
            2081 : [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30 ],
            2082 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30 ],
            2083 : [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30 ],
            2084 : [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30 ],
            2085 : [ 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30 ],
            2086 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30 ],
            2087 : [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30 ],
            2088 : [ 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30 ],
            2089 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30 ],
            2090 : [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30 ]
        };

        non13StartYears = {
            1975 : 12,
            2000 : 14,
            2004 : 14,
            2008 : 14,
            2012 : 14,
            2016 : 14,
            2020 : 14,
            2024 : 14,
            2027 : 14,
            2028 : 14,
            2031 : 14,
            2032 : 14,
            2035 : 14,
            2036 : 14,
            2039 : 14,
            2040 : 14,
            2043 : 14,
            2044 : 14,
            2047 : 14,
            2048 : 14,
            2051 : 14,
            2052 : 14,
            2055 : 14,
            2056 : 14,
            2058 : 14,
            2059 : 14,
            2060 : 14,
            2062 : 14,
            2063 : 14,
            2064 : 14,
            2066 : 14,
            2067 : 14,
            2068 : 14,
            2070 : 14,
            2071 : 14,
            2072 : 14,
            2074 : 14,
            2075 : 14,
            2076 : 14,
            2078 : 14,
            2079 : 14,
            2080 : 14,
            2082 : 14,
            2083 : 14,
            2084 : 14,
            2086 : 14,
            2087 : 14,
            2088 : 15,
            2089 : 14,
            2090 : 14,
            2091 : 14,
            2093 : 14,
            2094 : 14,
            2095 : 14,
            2096 : 15,
            2098 : 14,
            2099 : 14,
            2100 : 14
        };
        newYearDates = {};
        for (i = app.START_YEAR; i <= app.END_YEAR; i += 1) {
            newYearDates[i] = 13;
        }
        for (i in non13StartYears) {
            if(non13StartYears.hasOwnProperty(i)) {
                newYearDates[i] = non13StartYears[i];
            }
        }

        dateTotal = {};
        startYearVal = app.START_YEAR + app.DIFF_YEAR;
        total = 0;
        for (year in years) {
            if(years.hasOwnProperty(year)) {
              if (year >= startYearVal) {
                  var monthArray = years[year];
                  for (i = 0; i < monthArray.length; i++) {
                      total += monthArray[i];
                  }
                  dateTotal[year] = total;
              }
            }
        }

        totalForYearSinceStart = function (year) {
            return dateTotal[year];
        };

        newYearStartDate = function (year) {
            return newYearDates[year];
        };

        startYear = new Date(1913, 4, 13);

        return {
            newYearDates : newYearDates,
            totalForYearSinceStart : totalForYearSinceStart,
            newYearStartDate : newYearStartDate,
            startYear : startYear,
            year : years
        };
    }());
    
    dateCalculator = {
        convertToAd : function (year, month, date) {
            console.log(year + " " + month + " " + date);
            var monthArray = dateProvider.year[year];
            var daysSinceStartOfBikramYear = date - 1;
            var newYearStartedOn = dateProvider.newYearDates[year];
            for (var i = 0; i < month - 1; i += 1) {
                daysSinceStartOfBikramYear += monthArray[i];
            }
            var newYear = new Date(year - app.DIFF_YEAR, app.APRIL_INDEX, newYearStartedOn);
            newYear.setDate(newYear.getDate() + daysSinceStartOfBikramYear);
            return new DateValue(app.AD, 1900 + newYear.getYear(), newYear.getMonth(), newYear.getDate(),
                    newYear.getDay());
        },
        convertToBikram : function (year, month, date) {
            //find year startFor year
            var adDate = new Date(year, month, date);
            function findDaysToAdjust(bsYear) {
                var dayOfApril = dateProvider.newYearStartDate(bsYear);
                var firstDayOfNewYear = new Date(year, app.APRIL_INDEX, dayOfApril);
                var currentAdTime = adDate.getTime();
                var nextNewYearTime = firstDayOfNewYear.getTime();
                
                var millisDiff = Math.abs(nextNewYearTime - currentAdTime);
                var days = Math.floor((millisDiff * 1.0) / app.MILLIS_IN_DAY);
                return {newYearPending: (currentAdTime < nextNewYearTime), days: days};
            }
            
            function traverseMonthArrayForDaysToAdd(monthArray) {
                var monthIndex = 0, daysTracked = 0;
                for (var i = 0; i < monthArray.length; i += 1) {
                    daysTracked += monthArray[i];
                    if (daysTracked > daysToAdd) {
                        monthIndex = i;
                        daysTracked = daysTracked - monthArray[i];
                        break;
                    }
                }
                return {monthIndex: monthIndex, daysTracked: daysTracked};
              }

            var bsYear = year + app.DIFF_YEAR;
            var daysToAdjust = findDaysToAdjust(bsYear);
            //already in the new year
            var daysToAdd = daysToAdjust.days;
            var monthArray = dateProvider.year[bsYear];
            if (daysToAdjust.newYearPending) {
                bsYear = bsYear - 1;  //must be still in old year
                var totalInYear = 0;
                for (var i = 0; i < monthArray.length; i += 1) {
                    totalInYear += monthArray[i];
                }
                daysToAdd = (totalInYear - daysToAdjust.days);
            }
            var traversalResult = traverseMonthArrayForDaysToAdd(monthArray);
            var dateOfBSMonth = 1 + daysToAdd - traversalResult.daysTracked;
            return new DateValue(app.BS, bsYear, (traversalResult.monthIndex+1), dateOfBSMonth, adDate.getDay());
        }
    };
    return dateCalculator;
}());
