$(document).ready(function(){
	
	var adMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var bsMonths = ["Baisakh", "Jestha", "Ashaad", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
	
	for (var i=1970; i<=2100; i++) {
		var adYear = i - 57;
		$("#adYear").append(new Option(adYear, adYear));
		$("#bsYear").append(new Option(i, i));
	}
	
	var numberOfMonths = 12;
	
	for (var i=0; i < numberOfMonths; i++) {
		$("#adMonth").append(new Option(adMonths[i], i));
		$("#bsMonth").append(new Option(bsMonths[i], i));
	}
	
	var adDates = 31;
	
	for (var i=0; i<adDates; i++) {
		$("#bsDate").append(new Option(i+1, i+1));
		$("#adDate").append(new Option(i+1, i+1));
	}
	$("#bsDate").append(new Option(32, 32));
	
	var yearVal = new Date().getYear();
	if (yearVal<1000) {
		yearVal = 1900 + yearVal;
	}
	$("#adYear").val(yearVal);
	$("#bsYear").val(yearVal+57);
	
	
});