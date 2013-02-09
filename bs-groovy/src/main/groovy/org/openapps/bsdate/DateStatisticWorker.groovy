package org.openapps.bsdate

class DateStatisticWorker extends DateWorker {

	
	/**
	 * Groups all years with similar dates for each month, this shows there is a pattern
	 * 27, 19, 4 are some repeat patterns but may be something called "Mala-maas" breaks
	 * the pattern
	 *
	 * @return
	 */
	def groupByMonthDates() {
		def patt = [:]
		dates.each {k,v->
			if(patt.containsKey(v)) {
				patt.get(v) << k
			} else {
				patt[v] = [k]
			}
		}
		patt.each {k,v->
			log(k + " " + v)
		}
	}

}
