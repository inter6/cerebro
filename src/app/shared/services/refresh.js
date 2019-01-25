angular.module('cerebro').factory('RefreshService',
  function($rootScope, $timeout) {

    var timestamp = new Date().getTime();

    var interval = 0;

    this.getInterval = function() {
      return interval;
    };

    this.setInterval = function(newInterval) {
      if (interval > newInterval) {
        this.refresh(); // makes change apparent quicker
      }

      var oldInterval = interval;
      interval = newInterval;
      if (oldInterval == 0) {
        autoRefresh(this);
      }
    };

    this.lastUpdate = function() {
      return timestamp;
    };

    this.refresh = function() {
      timestamp = Math.max(timestamp, new Date().getTime()) + 1;
    };

    var autoRefresh = function(instance) {
      instance.refresh();
      if (interval != 0) {
        $timeout(function() { autoRefresh(instance); }, interval)
      }
    };

    autoRefresh(this);

    return this;
  }
);
