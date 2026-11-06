import status from '../config/status.js'
import isObject from '../utils/isObject.js'

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

const getDiffToPlain = (tree) => {
  const iter = (node, parent = '') => {
    const res = []
    for (const child of node) {
      if (child.type === status.unchanged) {
        continue
      }
      if (child.type === status.nested) {
        res.push(iter(child.children, parent + `${child.key}.`))
        continue
      }
      const substring = text[child.type](child.value, child.oldValue)
      res.push(`Property '${parent}${child.key}' ${substring}`)
    }
    return res.join('\n')
  }
  return iter(tree)
}

export default getDiffToPlain
