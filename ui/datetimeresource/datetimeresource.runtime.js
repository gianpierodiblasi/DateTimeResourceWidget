/* global TW, Intl */
TW.Runtime.Widgets.datetimeresource = function () {
  var thisWidget = this;
  var timeoutID;

  this.runtimeProperties = function () {
    return {
      'needsDataLoadingAndError': false
    };
  };

  this.renderHtml = function () {
    var html = '';
    html = '<div class="widget-content widget-datetimeresource" style="display:none;"></div>';
    return html;
  };

  this.afterRender = function () {
    thisWidget.setProperty('date', new Date());
    
    var debugMode = thisWidget.getProperty('debugMode');
    var autoUpdate = thisWidget.getProperty("autoUpdate");

    var offset = new Date().getTimezoneOffset();
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (debugMode) {
      console.log("DataTimeResource - browserTimeZoneOffset = " + offset + ", browserTimeZone = " + timezone + ", autoUpdate = " + autoUpdate);
    }

    thisWidget.setProperty('browserTimeZoneOffset', offset);
    thisWidget.setProperty('browserTimeZone', timezone);

    if (autoUpdate !== 'disabled') {
      timeoutID = setInterval(function () {
        var toUpdate = false;
        var date = new Date();

        switch (autoUpdate) {
          case 'second':
            toUpdate = true;
            break;
          case 'minute':
            toUpdate = date.getSeconds() === 0;
            break;
          case 'hour':
            toUpdate = date.getSeconds() === 0 && date.getMinutes() === 0;
            break;
          case 'day':
            toUpdate = date.getSeconds() === 0 && date.getMinutes() === 0 && date.getHours() === 0;
            break;
        }

        if (toUpdate) {
          thisWidget.setProperty('date', date);
          thisWidget.jqElement.triggerHandler("AutoUpdated");
        }
      }, 1000);
    }
  };

  this.serviceInvoked = function (serviceName) {
    var debugMode = thisWidget.getProperty('debugMode');
    var date = thisWidget.getProperty('date');

    if (serviceName === 'Evaluate') {
      var intervalType = thisWidget.getProperty('intervalType');

      if (debugMode) {
        console.log("DataTimeResource - intervalType = " + intervalType + ", date = " + date);
      }

      var start = new Date(), end;
      switch (intervalType) {
        case "today":
        case "this_week":
        case "this_month":
        case "this_year":
          break;
        case "yesterday":
          start = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 1);
          break;
        case "prev_week":
          start = new Date(start.getFullYear(), start.getMonth(), start.getDate() - 7);
          break;
        case "prev_month":
          start = new Date(start.getFullYear(), start.getMonth() - 1, start.getDate());
          break;
        case "prev_year":
          start = new Date(start.getFullYear() - 1, start.getMonth(), start.getDate());
          break;
        case "tomorrow":
          start = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
          break;
        case "next_week":
          start = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
          break;
        case "next_month":
          start = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
          break;
        case "next_year":
          start = new Date(start.getFullYear() + 1, start.getMonth(), start.getDate());
          break;
        case 'day':
        case 'week':
        case 'month':
        case 'year':
          start = new Date(date);
          break;
      }
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);

      switch (intervalType) {
        case "today":
        case "yesterday":
        case "tomorrow":
        case "day":
          end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 1);
          break;
        case "this_week":
        case "prev_week":
        case "next_week":
        case "week":
          switch (start.getDay()) {
            case 0:
              start.setDate(start.getDate() - 6);
              break;
            case 1:
              break;
            default:
              start.setDate(start.getDate() - start.getDay() + 1);
              break;
          }

          end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7);
          break;
        case "this_month":
        case "prev_month":
        case "next_month":
        case "month":
          start = new Date(start.getFullYear(), start.getMonth(), 1);
          end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
          break;
        case "this_year":
        case "prev_year":
        case "next_year":
        case "year":
          start = new Date(start.getFullYear(), 0, 1);
          end = new Date(start.getFullYear() + 1, 0, 1);
          break;
      }
      end.setTime(end.getTime() - 1);

      if (debugMode) {
        console.log("DataTimeResource - intervalStart = " + start + ", intervalEnd = " + end);
      }
      thisWidget.setProperty('intervalStart', start);
      thisWidget.setProperty('intervalEnd', end);

      thisWidget.jqElement.triggerHandler("Evaluated");
    } else if (serviceName === 'Format') {
      var dateFormat = thisWidget.getProperty('dateFormat');
      var intervalStart = thisWidget.getProperty('intervalStart');
      var intervalEnd = thisWidget.getProperty('intervalEnd');

      if (debugMode) {
        console.log("DataTimeResource - dateFormat = " + dateFormat + ", date = " + date + ", intervalStart = " + intervalStart + ", intervalEnd = " + intervalEnd);
      }

      if (dateFormat && date) {
        thisWidget.setProperty('dateFormatted', TW.DateUtilities.oldFormatDate(new Date(date), dateFormat));
      }
      if (dateFormat && intervalStart) {
        thisWidget.setProperty('intervalStartFormatted', TW.DateUtilities.oldFormatDate(new Date(intervalStart), dateFormat));
      }
      if (dateFormat && intervalEnd) {
        thisWidget.setProperty('intervalEndFormatted', TW.DateUtilities.oldFormatDate(new Date(intervalEnd), dateFormat));
      }

      thisWidget.jqElement.triggerHandler("Formatted");
    }
  };

  this.updateProperty = function (updatePropertyInfo) {
    if (updatePropertyInfo.TargetProperty === 'intervalType') {
      this.setProperty("intervalType", updatePropertyInfo.RawSinglePropertyValue);
    } else if (updatePropertyInfo.TargetProperty === 'date') {
      this.setProperty("date", updatePropertyInfo.RawSinglePropertyValue);
    } else if (updatePropertyInfo.TargetProperty === 'dateFormat') {
      this.setProperty("dateFormat", updatePropertyInfo.RawSinglePropertyValue);
    }
  };

  this.beforeDestroy = function () {
    if (timeoutID) {
      clearInterval(timeoutID);
    }
  }
  ;
};