import Tree from '../src/trees/tree.js'

const buildTree = (obj1, obj2) => {
  const root = []
  const union = { ...obj1, ...obj2 }
  for (const key in union) {
    let node
    if (!Object.hasOwn(obj2, key)) {
      node = new Tree(key, 'deleted', obj1[key])
    }
    else if (!Object.hasOwn(obj1, key)) {
      node = new Tree(key, 'added', obj2[key])
    }
    else if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
      node = new Tree(key, 'unchanged', obj1[key])
    }
    else {
      if (union[key] instanceof Object) {
        node = new Tree(key, 'nested')
        node.children = buildTree(obj1[key], obj2[key])
      }
      else {
        node = new Tree(key, 'changed', obj2[key], obj1[key])
      }
    }
    root.push(node)
  }
  return root.sort((a, b) => a.key > b.key ? 1 : -1)
}

const symbols = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
  changed: '  ',
  nested: '  ',
}

const getSpace = depth => '  '.repeat(depth)

const getValue = (value, depth) => {
  if (!(value instanceof Object)) {
    return value
  }
  const lines = Object.entries(value)
    .map(([key, value]) => `${getSpace(depth + 2)}  ${key}: ${getValue(value, depth + 2)}`)
    .join('\n')
  return `{\n${lines}\n${getSpace(depth + 1)}}`
}

const genDiff = (tree) => {
  const iter = (node, depth = 1) => {
    // console.log(node, 'node')
    const res = []
    for (const child of node) {
      // console.log(child, 'child')
      if (child.type === 'changed') {
        res.push(
          `${getSpace(depth)}- ${child.key}: ${getValue(child.oldvalue, depth)}`,
          `${getSpace(depth)}+ ${child.key}: ${getValue(child.value, depth)}`,
        )
      }
      else {
        const value = child.type === 'nested' ? iter(child.children, depth + 2) : getValue(child.value, depth)
        const space = getSpace(depth)
        res.push(`${space}${symbols[child.type]}${child.key}: ${value}`)
      }
    }
    return `{\n${res.join('\n')}\n${getSpace(depth - 1)}}`
  }
  return iter(tree, 1)
}

export default (obj1, obj2) => genDiff(buildTree(obj1, obj2))
