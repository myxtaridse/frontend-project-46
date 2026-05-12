export const genDiff = (obj1, obj2) => {
  const union = { ...obj1, ...obj2 }

  const keys = Object.keys(union).sort()

  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}`)
    }
    else if (!Object.hasOwn(obj1, key)) {
      acc.push(`+ ${key}: ${obj2[key]}`)
    }
    else if (obj1[key] !== obj2[key]) {
      acc.push(`- ${key}: ${obj1[key]}`)
      acc.push(`+ ${key}: ${obj2[key]}`)
    }
    else {
      acc.push(`  ${key}: ${obj1[key]}`)
    }
    return acc
  }, []).join('\n  ')

  return `{\n  ${result}\n}`
}
