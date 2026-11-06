import status from '../config/status.js'
import { isObject } from '../utils/isObject.js'

const valueHasObject = (value) => {
  if (isObject(value)) {
    return `[complex value]`
  }
  return typeof value === 'string' ? `'${value}'` : value
}

const text = {
  added: value => `was added with value: ${valueHasObject(value)}`,
  deleted: () => `was removed`,
  changed: (value, oldValue) => `was updated. From ${valueHasObject(oldValue)} to ${valueHasObject(value)}`,
}

const getDiffToJSON = (tree) => {
  const iter = (node, parent = '') => {
    const res = []
    for (const child of node) {
      if (child.type === status.nested) {
        res.push(iter(child.children, parent + child.key + '/'))
      }
      else if (child.type !== status.unchanged) {
        const obj = {}
        obj.path = parent + child.key
        obj.status = child.type
        if (child.type === status.changed) {
          obj.from = child.oldValue
          obj.to = child.value
        }
        const substring = text[child.type](child.value, child.oldValue)
        obj.message = `Property '${child.key}' ${substring}`

        res.push(obj)
      }
    }
    return res.flat()
  }
  return iter(tree)
}

export default getDiffToJSON
