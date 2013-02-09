package org.openapps.bsdate

import org.joda.time.LocalDate

class DateValue {

    private int year
    private int month
    private int date
    private DateType dt

    DateValue(LocalDate ad) {
        this(DateType.AD, ad.year, ad.monthOfYear, ad.dayOfMonth)
    }

    DateValue(DateType dt, int year, int month, int date) {
        this.dt = dt
        this.year = year
        this.month = month
        this.date = date
    }

    public String toString() {
        return "${year}-${month}-${date}"
    }

    public String displayValue() {
        return new StringBuilder(dt.name()).append(':').append(this)
    }

}
