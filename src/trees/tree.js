export default class Tree {
  constructor(key, type = 'unchanged', value = null, oldvalue = null) {
    this.key = key
    this.type = type
    this.value = value
    this.oldvalue = oldvalue
    this.children = null
  }
}
