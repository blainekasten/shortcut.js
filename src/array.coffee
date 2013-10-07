#
## Convenience method to see if an array includes a specific value
#
Array::includes = (val) ->
  if @.lastIndexOf(val) is -1
    return false
  else return true
