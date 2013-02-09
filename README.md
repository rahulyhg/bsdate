bsdate
======

A Bikram Sambat to Gregorian Calendar converter


The Bikram Sambat calendar has variable days for all months. This converter makes use of the days in month data between
1970BS to 2100BS.

If you want to study the pattern of dates, DateStatisticRunner can be run to see the groupings of dates based on how
their months are structured.

Strategies
==========
I have included two strategies to convert AD to BS. Although it could be done the same way for BS to AD, BS to AD is
really simple if the start of the gregorian year is indexed. To this effect every year in the above mentioned range
has its gregorian year start date indexed. This strategy is AdToBSIndexedStrategy.

The cumulative approach only ever needs one reference date. That reference date is the earliest recorded Gregorian date
which the calculator can handle. For this dataset, the reference date is Apr 13, 1913. This strategy is AdToBSCumulativeStrategy

The targeted platforms of support for this conversion is

i)  groovy
ii) javascript


bs-groovy
---------
The AD date representation is managed using joda time. The other dependencies of this project are 

  compile "joda-time:joda-time:2.1"
  testCompile('junit:junit:4.10')
  groovy (group:'org.codehaus.groovy', name: 'groovy-all', version:"2.1.0")

Any version will do, as basic constructs are used.


bs-javascript
-------------
Work in Progress
