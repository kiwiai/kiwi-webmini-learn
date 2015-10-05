makeBasicChart = ->
  xScale = new (Plottable.Scales.Linear)
  yScale = new (Plottable.Scales.Linear)
  xAxis = new (Plottable.Axes.Numeric)(xScale, 'bottom')
  yAxis = new (Plottable.Axes.Numeric)(yScale, 'left')
  plot = new (Plottable.Plots.Line)

  plot.x ((d) ->
    d.x
  ), xScale

  plot.y ((d) ->
    d.y
  ), yScale
  
  xmlhttp = new XMLHttpRequest
  url = 'myTutorials.txt'

  plotData = (arr) ->
    counter = 0
    reformattedArray = arr.data.map (obj)-> 
      rObj = {}
      rObj.x = counter
      rObj.y = obj
      counter += 1
      return rObj
    console.log reformattedArray
    dataset = new (Plottable.Dataset)(reformattedArray)
    plot.addDataset dataset
    chart = new (Plottable.Components.Table)([[yAxis,plot],[null,xAxis]])
    chart.renderTo 'svg#tutorial-result'
    return

  xmlhttp.onreadystatechange = ->
    if xmlhttp.readyState == 4 and xmlhttp.status == 200
      data = JSON.parse(xmlhttp.responseText)
      plotData data
    return

  xmlhttp.open 'GET', 'data/data.json', true
  xmlhttp.send()


  return


makeBasicChart()

# ---