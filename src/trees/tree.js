// выделем дерево различий
export default class TreeDiff {
  constructor(key, type = 'unchanged', value = null, oldValue = null) {
    this.key = key
    this.type = type
    this.value = value
    this.oldValue = oldValue
    this.children = []
  }
}
