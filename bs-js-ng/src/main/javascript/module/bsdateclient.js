function DateClient ($scope) {
    var now = new Date(), numberOfMonths = 12, daysInAMonth = 31;

    $scope.years = function () {
        var i, years = [];
        for (i = app.START_YEAR; i <= app.END_YEAR; i += 1) {
            years.push(i - app.DIFF_YEAR);
        }
        return years;
    }

    $scope.bsYears = function () {
        var i, years = [];
        for (i = app.START_YEAR; i <= app.END_YEAR; i += 1) {
            years.push(i);
        }
        return years;
    }

    $scope.months = function () {
        var i, months = [];
        for (i = 0; i < numberOfMonths; i += 1) {
            months.push({index:i, label:app.AD_MONTHS[i]});
        }
        return months;
    };

    $scope.bsMonths = function () {
        var i, months = [];
        for (i = 0; i < numberOfMonths; i += 1) {
            months.push({index:i, label:app.BS_MONTHS[i]});
        }
        return months;
    };

    $scope.dates = function () {
        var dates = [];
        for (i = 0; i < daysInAMonth; i += 1) {
            dates.push(i + 1);
        }
        return dates;
    }

    $scope.bsDates = function () {
        var dates = [];
        for (i = 0; i < daysInAMonth; i += 1) {
            dates.push(i + 1);
        }
        dates.push(32);
        return dates;
    }

    $scope.adYear = now.getYear() + 1900;
    $scope.adMonth = now.getMonth();
    $scope.adDate = now.getDate();

    
    $scope.toAD = function() {
        var ad = bsCalculator.convertToAd($scope.bsYear, $scope.bsMonth + 1, $scope.bsDate);
        $scope.adYear = ad.year;
        $scope.adMonth = ad.month - 1;
        $scope.adDate = ad.date;
    }
    
    $scope.toBS = function() {
        var bikram = bsCalculator.convertToBikram($scope.adYear, $scope.adMonth + 1, $scope.adDate);
        $scope.bsMonth = bikram.month - 1;
        $scope.bsDate = bikram.date;
        $scope.bsYear = bikram.year;
    }

    $scope.toBS();
}
