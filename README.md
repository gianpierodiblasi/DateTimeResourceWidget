# DateTimeResourceWidget
An extension to simplify the management of dates, times and date intervals.

**This Extension is provided as-is and without warranty or support. It is not part of the PTC product suite and there is no PTC support.**

## Description
This extension provides a widget to simplify the management of dates, times and date intervals.

## Properties
- debugMode - BOOLEAN (default = false): if set to true it sends to the browser's JS console a set of information useful for debugging the widget
- intervalType - STRING (default = 'today'): the type of date interval (options: today, this_week, this_month, this_year, yesterday, prev_week, prev_month, prev_year, tomorrow, next_week, next_month, next_year, day, week, month, year)
- browserTimeZoneOffset - NUMBER (no default value): the browser timezone offset (in minutes)
- browserTimeZone - STRING (no default value): the browser timezone
- autoUpdate - STRING (default = 'disabled'): if not set to 'disabled', it represents the interval after which the date is automatically updated to the current date (options: disabled, second, minute, hour, day)
- date - DATETIME (default = the current datetime): the date to use for intervalType = day, week, month, year, and for date formatting
- dateFormat - STRING (no default value): the date format
- dateFormatted - STRING (no default value): the formatted date
- intervalStart - DATETIME (no default value): the start date of the interval
- intervalEnd - DATETIME (no default value): the end date of the interval
- intervalStartFormatted - STRING (no default value): the formatted start date of the interval
- intervalEndFormatted - STRING (no default value): the formatted end date of the interval

## Services
- Evaluate: service to evaluate the interval
- Format: service to format the date, the intervalStart and the intervalEnd

## Events
- Evaluated: event to notify that the interval has been evaluated
- Formatted: event to notify that the date and interval have been evaluated
- AutoUpdated: event to notify that the date has been auto updated

## Donate
If you would like to support the development of this and/or other extensions, consider making a [donation](https://www.paypal.com/donate/?business=HCDX9BAEYDF4C&no_recurring=0&currency_code=EUR).
