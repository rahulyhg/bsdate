package org.openapps.bsdate;

import org.joda.time.LocalDate;

public interface DateDataProvider {

	int totalForYearSinceStart(int year);
	
	int[] monthDatesInYear(int year);
	
	int newYearStartDate(int year);
	
	LocalDate startYear();
}
