(function() {
  var GaussianFilter;

  GaussianFilter = function(arr, z) {
    var FirstGaussian, N0, N1, ZerothGaussian, calculateConvolution, filteredSignal, runFilter;
    filteredSignal = [];
    ZerothGaussian = function() {
      var i, j, k, l, m, n, ref, ref1, ref2, ret, sum, tau, tvar;
      ret = [];
      tvar = Math.floor(8 * z + 0.5);
      k = 2 * tvar + 1;
      for (i = j = 0, ref = k; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        ret[i] = 0;
      }
      ret[tvar] = 1;
      sum = 1;
      n = 1 / (Math.sqrt(2 * Math.PI) * z);
      for (tau = l = 1, ref1 = tvar; 1 <= ref1 ? l < ref1 : l > ref1; tau = 1 <= ref1 ? ++l : --l) {
        ret[tvar + tau] = n * Math.exp(-(tau * tau) / (2 * z * z));
        ret[tvar - tau] = n * Math.exp(-(tau * tau) / (2 * z * z));
        sum += ret[tvar + tau] * 2;
      }
      for (i = m = 0, ref2 = k; 0 <= ref2 ? m < ref2 : m > ref2; i = 0 <= ref2 ? ++m : --m) {
        ret[i] = ret[i] / sum;
      }
      return ret;
    };
    FirstGaussian = function(arr) {
      var dd, j, ref, tau, tvar;
      tvar = Math.floor(arr.length / 2);
      arr[tvar] = 0;
      for (tau = j = 1, ref = tvar; 1 <= ref ? j < ref : j > ref; tau = 1 <= ref ? ++j : --j) {
        dd = -1 * arr[tvar + tau] / (z * z);
        arr[tvar + tau] = -1 * dd;
        arr[tvar + tau] = dd;
      }
      return arr;
    };
    calculateConvolution = function(set, N) {
      var i, j, ref, sum;
      sum = 0;
      for (i = j = 0, ref = set.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        sum += set[i] * N[i];
      }
      return sum;
    };
    runFilter = function(N) {
      var centerPos, end, i, j, ref, start, subN, subset;
      centerPos = Math.floor(N.length / 2);
      for (i = j = 0, ref = arr.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        if (i - centerPos < 0) {
          start = 0;
          end = i + centerPos;
          subN = N.slice(centerPos - i, N.length);
        } else if (i + centerPos > arr.length) {
          start = i - centerPos;
          end = arr.length;
          subN = N.slice(0, centerPos + (arr.length - i));
        } else {
          start = i - centerPos;
          end = i + centerPos;
          subN = N;
        }
        subset = arr.slice(start, end);
        filteredSignal[i] = calculateConvolution(subset, subN);
      }
    };
    N0 = ZerothGaussian();
    N1 = FirstGaussian(N0);
    runFilter(N1);
    return filteredSignal;
  };

  window.GaussianFilter = GaussianFilter;

}).call(this);
