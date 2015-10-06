(function() {
  var AjaxRequest, graphAjaxData, noisyData, perfectData, realData;

  AjaxRequest = (function() {
    function AjaxRequest(url, cb) {
      var xmlhttp;
      xmlhttp = new XMLHttpRequest;
      xmlhttp.onreadystatechange = function() {
        var data;
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          data = JSON.parse(xmlhttp.responseText);
          cb(data);
        }
      };
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
    }

    return AjaxRequest;

  })();

  graphAjaxData = function(dataUrl, targetID) {
    var ajax, plot, plotData, xAxis, xScale, yAxis, yScale;
    xScale = new Plottable.Scales.Linear;
    yScale = new Plottable.Scales.Linear;
    xAxis = new Plottable.Axes.Numeric(xScale, 'bottom');
    yAxis = new Plottable.Axes.Numeric(yScale, 'left');
    plot = new Plottable.Plots.Line;
    plot.x((function(d) {
      return d.x;
    }), xScale);
    plot.y((function(d) {
      return d.y;
    }), yScale);
    plotData = function(arr) {
      var chart, counter, dataset, reformattedArray, set;
      if (targetID === 'naive') {
        set = NaiveAverage(arr.data, 50);
      } else if (targetID === 'gaussian') {
        set = GaussianFilter(arr.data, 0, 25);
      } else if (targetID === 'derivative') {
        set = GaussianFilter(arr.data, 1, 25);
      } else {
        set = arr.data;
      }
      counter = 0;
      reformattedArray = set.map(function(obj) {
        var rObj;
        rObj = {};
        rObj.x = counter;
        rObj.y = obj;
        counter += 1;
        return rObj;
      });
      dataset = new Plottable.Dataset(reformattedArray);
      plot.addDataset(dataset);
      chart = new Plottable.Components.Table([[yAxis, plot], [null, xAxis]]);
      chart.renderTo('svg#' + targetID);
    };
    ajax = new AjaxRequest(dataUrl, plotData);
  };

  perfectData = 'data/perfectData.json';

  noisyData = 'data/noisyData.json';

  realData = 'data/bentOverData.json';

  graphAjaxData(perfectData, 'perfect');

  graphAjaxData(noisyData, 'noisy');

  graphAjaxData(noisyData, 'naive');

  graphAjaxData(noisyData, 'gaussian');

  graphAjaxData(noisyData, 'derivative');

}).call(this);
