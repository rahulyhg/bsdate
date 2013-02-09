package org.openapps.bsdate

import org.joda.time.LocalDate

class DateStatisticWorkerRunner {

    public static void main(String[] args) {
		DateStatisticWorker worker = new DateStatisticWorker()
		worker.groupByMonthDates()
    }
}
