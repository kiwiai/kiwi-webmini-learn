GaussianFilter = (arr, order, z)->
  filteredSignal = []
  
  ZerothGaussian = ->
    ret = []
    # Set array size
    tvar = Math.floor((8 * z + 0.5))
    k = 2 * tvar + 1
    # Zero initiate
    for i in [0...k]
      ret[i] = 0

    # Center of the Gaussian Curve is 1
    ret[tvar] = 1
    sum = 1

    for tau in [1...tvar]
      ret[tvar+tau] = Math.exp(-(tau*tau)/ (2 * z * z)) 
      ret[tvar-tau] = Math.exp(-(tau*tau)/ (2 * z * z))
      sum += ret[tvar+tau]*2
    
    for i in [0...k]
      ret[i] = ret[i]/sum
    return ret

  FirstGaussian = (arr)->
    tvar = Math.floor(arr.length/2)
    arr[tvar] = 0;
    for tau in [1...tvar]
      dd = -tau * arr[tvar + tau] / (z * z)
      arr[tvar + tau] = -1 * dd;
      arr[tvar - tau] = dd;
    return arr

  calculateConvolution = (set, N)->
    sum = 0
    for i in [0 ... set.length]
      sum += set[i] * N[i]
    return sum

  runFilter = (N)->
    centerPos = Math.floor(N.length/2)
    for i in [0 ... arr.length]
      if (i - centerPos < 0)
        start = 0
        end = i + centerPos
        subN = N[(centerPos - i) ... N.length]
      else if (i + centerPos > arr.length)
        start = i-centerPos
        end = arr.length
        subN = N[0 ... (centerPos + (arr.length - i) )]
      else
        start = i-centerPos
        end = i+centerPos
        subN = N
      
      subset = arr[start ... end]
      filteredSignal[i] = calculateConvolution(subset, subN)
    return

  if order == 1
    N0 = ZerothGaussian()
    N1 = FirstGaussian(N0)
    runFilter(N1)
  else
    N0 = ZerothGaussian()
    runFilter(N0)

  return filteredSignal

window.GaussianFilter = GaussianFilter
