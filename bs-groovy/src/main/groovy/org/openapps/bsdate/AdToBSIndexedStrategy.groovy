package org.openapps.bsdate

import org.joda.time.Days
import org.joda.time.LocalDate

class AdToBSIndexedStrategy implements AdToBSStrategy {

	public DateValue convert(LocalDate ad, DateDataProvider provider) {
		int year = ad.year
		int bikramYearB = year + 57
		int startDateOfNewYear = provider.newYearStartDate(bikramYearB)
		LocalDate newYear = new LocalDate(year, 4, startDateOfNewYear)
		int bikramYear = bikramYearB
		if (ad.isBefore(newYear)) {
			bikramYear = bikramYearB - 1
		}

		int diffDays = Days.daysBetween(newYear, ad).days +1
		def monthArray = provider.monthDatesInYear(bikramYear)

		int month = 0
		int date = 0
		if (diffDays>0) {
			int x = 0
			for (i in monthArray) {
				x+=i
				month++
				if (x>=diffDays) {
					break
				}
			}
			int daysToAdjust = x  - diffDays
			date = (monthArray[month-1]-daysToAdjust)
		} else {
			month = 12
			int trackProgress = 0
			diffDays = diffDays.abs()
			for(x in monthArray[monthArray.size()-1..0]) {
				trackProgress += x
				month--
				if (trackProgress>=diffDays) {
					month++
					break
				}
			}
			date = trackProgress  - diffDays
			if(date>0) {
				month = month -1
			} else {
				date = monthArray[month]
			}
			month = month + 1
		}
		def bikramDate = new DateValue(DateType.BS, bikramYear, month, date)
		return bikramDate
	}
}
