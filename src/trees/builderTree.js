// строим дерево различий
import TreeDiff from './tree.js'
import status from '../../utils/status.js'

const builderTree = (obj1, obj2) => {
  const union = { ...obj1, ...obj2 }
  const res = []
  for (const key in union) {
    let node
    if (!Object.hasOwn(obj2, key)) {
      node = new TreeDiff(key, status.deleted, obj1[key])
    }
    else if (!Object.hasOwn(obj1, key)) {
      node = new TreeDiff(key, status.added, obj2[key])
    }
    else if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
      node = new TreeDiff(key, status.unchanged, obj1[key])
    }
    else {
      if (union[key] instanceof Object) {
        node = new TreeDiff(key, status.nested)
        node.children = builderTree(obj1[key], obj2[key])
      }
      else {
        node = new TreeDiff(key, status.changed, obj2[key], obj1[key])
      }
    }
    res.push(node)
  }
  return res.sort((a, b) => a.key > b.key ? 1 : -1)
}

export default builderTree
