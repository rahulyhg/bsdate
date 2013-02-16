function DateClient($scope) {
    var yearVal =  new Date().getYear();;
    if (yearVal < 1900) {
        yearVal += 1900;
    }
    $scope.yearVal = yearVal;
}