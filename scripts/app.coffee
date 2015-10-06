class AjaxRequest
  constructor:(url, cb) ->
    xmlhttp = new XMLHttpRequest

    xmlhttp.onreadystatechange = ->
      if xmlhttp.readyState == 4 and xmlhttp.status == 200
        data = JSON.parse(xmlhttp.responseText)
        cb(data)
      return

    xmlhttp.open 'GET', url, true
    xmlhttp.send()

graphAjaxData = (dataUrl, targetID)->
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


  plotData = (arr) ->
    if targetID == 'naive'
      set = NaiveAverage(arr.data, 50)
    else if targetID == 'gaussian'
      set = GaussianFilter(arr.data, 100)
    else
      set = arr.data

    counter = 0
    reformattedArray = set.map (obj)-> 
      rObj = {}
      rObj.x = counter
      rObj.y = obj
      counter += 1
      return rObj
    dataset = new (Plottable.Dataset)(reformattedArray)
    plot.addDataset dataset
    chart = new (Plottable.Components.Table)([[yAxis,plot],[null,xAxis]])
    chart.renderTo 'svg#' + targetID
    return
  
  ajax = new AjaxRequest(dataUrl, plotData)
  #noisyGraph = new AjaxRequest(noisyData, plotNoisy)

  return


perfectData = 'data/perfectData.json'
noisyData = 'data/noisyData.json'
realData = 'data/bentOverData.json'
graphAjaxData(perfectData,'perfect')
graphAjaxData(noisyData,'noisy')
graphAjaxData(noisyData,'naive')
graphAjaxData(noisyData,'gaussian')

