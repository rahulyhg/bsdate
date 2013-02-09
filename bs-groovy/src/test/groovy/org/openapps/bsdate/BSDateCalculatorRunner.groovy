package org.openapps.bsdate

import org.joda.time.LocalDate

class BSDateCalculatorRunner {

    public static void main(String[] args) {
        DateCalculator converter = new DateCalculator()

        assert '2069-10-26' == converter.convertToBikram(new LocalDate(2013, 2, 8))
        assert '2058-10-4' == converter.convertToBikram(new LocalDate(2002, 1, 17))
        assert '2062-10-4' == converter.convertToBikram(new LocalDate(2006, 1, 17))
        assert '2068-10-3' == converter.convertToBikram(new LocalDate(2012, 1, 17))
        assert '2038-9-26' == converter.convertToBikram(new LocalDate(1982, 1, 10))
        assert '2040-7-11' == converter.convertToBikram(new LocalDate(1983, 10, 28))
        assert '2037-9-11' == converter.convertToBikram(new LocalDate(1980, 12, 25))
        assert '2038-9-10' == converter.convertToBikram(new LocalDate(1981, 12, 25))

        assert '2069-5-31' == converter.convertToBikramUsingNewYears(new LocalDate(2012, 9, 16))
        assert '2069-1-1' == converter.convertToBikramUsingNewYears(new LocalDate(2012, 4, 13))
        assert '2068-12-30' == converter.convertToBikramUsingNewYears(new LocalDate(2012, 4, 12))

        assert '2069-12-31' == converter.convertToBikramUsingNewYears(new LocalDate(2013, 4, 13))
        assert '2070-1-1' == converter.convertToBikramUsingNewYears(new LocalDate(2013, 4, 14))
        assert '2058-10-4' == converter.convertToBikramUsingNewYears(new LocalDate(2002, 1, 17))

        assert '2013-02-08' == converter.convertToAd(2069, 10, 26)
        assert '2012-09-16' == converter.convertToAd(2069, 5, 31)
        assert '2012-04-12' == converter.convertToAd(2068, 12, 30)
        assert '2012-04-13' == converter.convertToAd(2069, 1, 1)
        assert '2013-04-13' == converter.convertToAd(2069, 12, 31)
        assert '2013-04-14' == converter.convertToAd(2070, 1, 1)
		
		
    }
}
