// выделем дерево различий
const treeDiff = (key, type = 'unchanged', value = null, oldValue = null) => ({
  key,
  type,
  value,
  oldValue,
  children: [],
})

export default treeDiff
