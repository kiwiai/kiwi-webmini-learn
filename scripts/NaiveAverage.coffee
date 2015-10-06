NaiveAverage = (arr, k) ->
  ret = []

  calculateAverage = (set)->
    sum = 0
    for pt in set
      sum += pt
    currAvg = sum / set.length
    return currAvg

  runFilter = ->
    for i in [0 ... arr.length]
      start = if i-k < 0 then 0 else i-k
      end = if i+k > arr.length then arr.length else i+k
      subset = arr[start ... end]
      ret[i] = calculateAverage(subset)
    return

  runFilter()
  return ret

window.NaiveAverage = NaiveAverage