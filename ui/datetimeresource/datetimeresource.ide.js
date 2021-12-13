/* global TW */
TW.IDE.Widgets.datetimeresource = function () {
  this.widgetIconUrl = function () {
    return '../Common/extensions/DateTimeResourceWidget/ui/datetimeresource/calendar.png';
  };

  this.widgetProperties = function () {
    return {
      'name': 'DateTimeResource',
      'description': 'Widget to simplify the management of dates, times and date intervals',
      'category': ['Common'],
      'iconImage': 'calendar.png',
      'properties': {
        'Width': {
          'description': 'width',
          'defaultValue': 200
        },
        'Height': {
          'description': 'height',
          'defaultValue': 28
        },
        'debugMode': {
          'isVisible': true,
          'baseType': 'BOOLEAN',
          'isEditable': true,
          'defaultValue': false,
          'description': 'true to activate the debug'
        },
        'intervalType': {
          'isVisible': true,
          'baseType': 'STRING',
          'isEditable': true,
          isBindingTarget: true,
          'description': 'The type of date interval',
          'defaultValue': 'today',
          'selectOptions': [
            {value: 'today', text: 'Today'},
            {value: 'this_week', text: 'This Week'},
            {value: 'this_month', text: 'This Month'},
            {value: 'this_year', text: 'This Year'},
            {value: 'yesterday', text: 'Yesterday'},
            {value: 'prev_week', text: 'Prev Week'},
            {value: 'prev_month', text: 'Prev Month'},
            {value: 'prev_year', text: 'Prev Year'},
            {value: 'tomorrow', text: 'Tomorrow'},
            {value: 'next_week', text: 'Next Week'},
            {value: 'next_month', text: 'Next Month'},
            {value: 'next_year', text: 'Next Year'},
            {value: 'day', text: 'Day'},
            {value: 'week', text: 'Week'},
            {value: 'month', text: 'Month'},
            {value: 'year', text: 'Year'}
          ]
        },
        'browserTimeZoneOffset': {
          'isEditable': false,
          description: "The browser timezone offset (in minutes)",
          isBindingSource: true,
          defaultValue: '',
          baseType: 'NUMBER'
        },
        'browserTimeZone': {
          'isEditable': false,
          description: "The browser timezone",
          isBindingSource: true,
          defaultValue: '',
          baseType: 'STRING'
        },
        'date': {
          'isEditable': true,
          description: "The date to use for intervalType = day, week, month, year",
          isBindingTarget: true,
          defaultValue: new Date(),
          baseType: 'DATETIME'
        },
        'intervalStart': {
          'isEditable': false,
          description: "The start date of the interval",
          isBindingSource: true,
          baseType: 'DATETIME'
        },
        'intervalEnd': {
          'isEditable': false,
          description: "The end date of the interval",
          isBindingSource: true,
          baseType: 'DATETIME'
        }
      }
    };
  };

  this.widgetServices = function () {
    return {
      'Evaluate': {
        'warnIfNotBound': true
      }
    };
  };

  this.widgetEvents = function () {
    return {
      'Evaluated': {}
    };
  };

  this.renderHtml = function () {
    return '<div class="widget-content widget-datetimeresource">' + '<span class="datetimeresource-property">DateTime Resource</span>' + '</div>';
  };
};