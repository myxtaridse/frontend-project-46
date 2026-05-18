import status from '../../utils/status.js'

const valueHasObject = (value) => {
  if (value instanceof Object) {
    return `[complex value]`
  }
  return typeof value === 'string' ? `'${value}'` : value
}

const text = {
  added: value => `was added with value: ${valueHasObject(value)}`,
  deleted: () => `was removed`,
  changed: (oldValue, value) => `was updated. From ${valueHasObject(oldValue)} to ${valueHasObject(value)}`,
}

const genDiff = (tree) => {
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
      const substring = child.type === status.changed
        ? text[child.type](child.oldValue, child.value)
        : text[child.type](child.value)
      res.push(`Property '${parent}${child.key}' ${substring}`)
    }
    return res.join('\n')
  }
  return iter(tree)
}

export default genDiff
