(function() {
  var makeBasicChart;

  makeBasicChart = function() {
    var plot, plotData, url, xAxis, xScale, xmlhttp, yAxis, yScale;
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
    xmlhttp = new XMLHttpRequest;
    url = 'myTutorials.txt';
    plotData = function(arr) {
      var chart, counter, dataset, reformattedArray;
      counter = 0;
      reformattedArray = arr.data.map(function(obj) {
        var rObj;
        rObj = {};
        rObj.x = counter;
        rObj.y = obj;
        counter += 1;
        return rObj;
      });
      console.log(reformattedArray);
      dataset = new Plottable.Dataset(reformattedArray);
      plot.addDataset(dataset);
      chart = new Plottable.Components.Table([[yAxis, plot], [null, xAxis]]);
      chart.renderTo('svg#tutorial-result');
    };
    xmlhttp.onreadystatechange = function() {
      var data;
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
        data = JSON.parse(xmlhttp.responseText);
        plotData(data);
      }
    };
    xmlhttp.open('GET', 'data/data.json', true);
    xmlhttp.send();
  };

  makeBasicChart();

}).call(this);
