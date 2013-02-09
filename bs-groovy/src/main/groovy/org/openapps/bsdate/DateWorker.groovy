package org.openapps.bsdate

import org.joda.time.LocalDate;

abstract class DateWorker {

	def dates = [:]
	def dateTotal = [:]
	
	def newYearDates = [:]

	public DateWorker() {
		init()
	}
	
	private def init() {
		load('year.properties').collect({it}).findAll{!(it ==~ /^#.*/)}.each{line ->
			def year, monthArray
			(year, monthArray) = line.split('=')
			dates[year.trim() as int] = monthArray.trim().split(',').collect{it as int}
		}
		
		for (x in 1970..2090) {
			newYearDates[x] = 13
		}
		
		load('newyeardate.properties').eachLine {line ->
			def year, startDayOfNewYear
			(year, startDayOfNewYear) = line.split('=')
			newYearDates[year as int] = startDayOfNewYear as int
		}

	}
	
	def load(String fileName) {
		File f = new File(getClass().classLoader.getResource(fileName).file)
	}
	
	def log(Object str) {
		println str
	}
}
