// строим дерево различий
import status from '../config/status.js'
import { isObject } from '../utils/isObject.js'
import treeDiff from './tree.js'

const builderTree = (obj1, obj2) => {
  const union = { ...obj1, ...obj2 }
  const res = []
  for (const key of Object.keys(union)) {
    let node

    if (!Object.hasOwn(obj2, key)) {
      node = treeDiff(key, status.deleted, obj1[key])
    }
    else if (!Object.hasOwn(obj1, key)) {
      node = treeDiff(key, status.added, obj2[key])
    }
    else if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
      node = treeDiff(key, status.unchanged, obj1[key])
    }
    else if (isObject(obj1[key]) && isObject(union[key])) {
      node = treeDiff(key, status.nested)
      node.children = builderTree(obj1[key], obj2[key])
    }
    else {
      node = treeDiff(key, status.changed, obj2[key], obj1[key])
    }
    res.push(node)
  }
  return res.sort((a, b) => a.key > b.key ? 1 : -1)
}

export default builderTree
