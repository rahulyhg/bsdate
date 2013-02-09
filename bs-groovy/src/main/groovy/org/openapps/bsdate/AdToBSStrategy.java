package org.openapps.bsdate;

import org.joda.time.LocalDate;

public interface AdToBSStrategy {
	DateValue convert(LocalDate ad, DateDataProvider provider);
}
