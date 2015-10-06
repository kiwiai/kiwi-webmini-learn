(function() {
  var NaiveAverage;

  NaiveAverage = function(arr, k) {
    var calculateAverage, ret, runFilter;
    ret = [];
    calculateAverage = function(set) {
      var currAvg, j, len, pt, sum;
      sum = 0;
      for (j = 0, len = set.length; j < len; j++) {
        pt = set[j];
        sum += pt;
      }
      currAvg = sum / set.length;
      return currAvg;
    };
    runFilter = function() {
      var end, i, j, ref, start, subset;
      for (i = j = 0, ref = arr.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        start = i - k < 0 ? 0 : i - k;
        end = i + k > arr.length ? arr.length : i + k;
        subset = arr.slice(start, end);
        ret[i] = calculateAverage(subset);
      }
    };
    runFilter();
    return ret;
  };

  window.NaiveAverage = NaiveAverage;

}).call(this);
