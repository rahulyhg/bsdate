package org.openapps.bsdate

import org.joda.time.Days
import org.joda.time.LocalDate

class AdToBSCumulativeStrategy implements AdToBSStrategy {

	public DateValue convert(LocalDate ad, DateDataProvider provider) {
		LocalDate approxBikram = ad.plusYears(56).plusMonths(8).plusDays(16)
		int year =  approxBikram.getYear()
		int daysSinceRefDate = Days.daysBetween(provider.startYear(), ad).getDays()
		
		int diffToTrack = provider.totalForYearSinceStart(year) - daysSinceRefDate - 1
		def currentMonths = provider.monthDatesInYear(year)
		int trackProgress = 0
		int month = 12
		for(x in currentMonths[currentMonths.size()-1..0]) {
			trackProgress += x
			month--
			if (trackProgress>=diffToTrack) {
				month++
				break
			}
		}
		int daysToAdd = trackProgress - diffToTrack
		if (daysToAdd == 0) {
			month--
			daysToAdd = currentMonths[month-1]
		}
		return new DateValue(DateType.BS, year, month, daysToAdd)
	}
}
