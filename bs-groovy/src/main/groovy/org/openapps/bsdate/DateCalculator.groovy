package org.openapps.bsdate

import org.joda.time.LocalDate

class DateCalculator extends DateWorker implements DateDataProvider {

	private int startYear
	private static LocalDate REF_DATE = new LocalDate(1913, 4, 13)

	private AdToBSStrategy strategy = new AdToBSCumulativeStrategy()
	
	DateCalculator() {
		initialize()
	}
	
	DateCalculator(AdToBSStrategy strategy) {
		this()
		this.strategy = strategy
	}

	private void initialize() {
		startYear =  REF_DATE.plusYears(57).getYear()
		log("I only know of dates from ${startYear}")
		int total = 0
		dates.findAll{k,v->k>=startYear}each {k, v ->
			v.each {total += it}
			dateTotal[k] = total
		}
	}


	/**
	 * This doesn't make use of the start date of each gregorian new year.
	 * This method doesn't work for few years:
	 * BS: 1972, 1974, 1980, 1992
	 *
	 * The number of days in these years were modified so the cumulative approach works.
	 */
	public String convertToBikram(LocalDate ad) {
		def bikramDate = strategy.convert(ad, this)
		log (new DateValue(ad).displayValue() + " is " + bikramDate.displayValue())
		return bikramDate.toString()
	}

	/**
	 * Uses the start of the gregorian new year to find the difference in days
	 */
	public def convertToAd(int year, int month, int date) {
		def monthArray = dates[year]
		int daysSinceStartOfBikramYear = date - 1
		for (x in monthArray[0..<month-1]) {
			daysSinceStartOfBikramYear += x
		}
		int newYearStartedOn = newYearDates[year]
		def newYear = new LocalDate(year-57, 4, newYearStartedOn)
		return newYear.plusDays(daysSinceStartOfBikramYear).toString('yyyy-MM-dd')
	}

	@Override
	public int totalForYearSinceStart(int year) {
		return dateTotal[year];
	}

	@Override
	public int[] monthDatesInYear(int year) {
		return dates[year];
	}

	@Override
	public int newYearStartDate(int year) {
		return newYearDates[year];
	}

	@Override
	public LocalDate startYear() {
		return REF_DATE;
	}	
   
}
