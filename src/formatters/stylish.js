import status from '../config/status.js'
import { isObject } from '../utils/isObject.js'

const getSpace = depth => '    '.repeat(depth)
const getSpaceStatus = {
  added: depth => getSpace(depth).slice(2) + '+ ',
  deleted: depth => getSpace(depth).slice(2) + '- ',
  unchanged: depth => getSpace(depth),
  nested: depth => getSpace(depth),
}
const getValue = (child, depth) => {
  if (!isObject(child)) {
    return child
  }
  const list = Object.entries(child)
    .map(([key, value]) => `${getSpace(depth)}${key}: ${getValue(value, depth + 1)}`)
    .join('\n')

  return `{\n${list}\n${getSpace(depth - 1)}}`
}
const getDiffToStylish = (tree) => {
  const iter = (node, depth = 1) => {
    const res = []
    for (const child of node) {
      if (child.type === status.changed) {
        res.push(
          `${getSpaceStatus.deleted(depth)}${child.key}: ${getValue(child.oldValue, depth + 1)}`,
          `${getSpaceStatus.added(depth)}${child.key}: ${getValue(child.value, depth + 1)}`,
        )
      }
      else {
        const value = child.type === status.nested ? iter(child.children, depth + 1) : getValue(child.value, depth + 1)
        res.push(
          `${getSpaceStatus[child.type](depth)}${child.key}: ${value}`,
        )
      }
    }
    return `{\n${res.join('\n')}\n${getSpace(depth - 1)}}`
  }
  return iter(tree)
}

export default getDiffToStylish
