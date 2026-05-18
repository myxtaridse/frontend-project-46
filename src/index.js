import readFile from './utils/readFile.js'
import path from 'node:path'
import jsonParse from './parsers/jsonParse.js'
import yamlParse from './parsers/yamlParse.js'
import builderTree from './trees/builderTree.js'
import fomatters from './formatters/index.js'

const mapping = {
  json: jsonParse,
  yaml: yamlParse,
  yml: yamlParse,
}

const parser = (filepath1, filepath2, formatName) => {
  const formatFile1 = path.extname(filepath1).slice(1)
  const formatFile2 = path.extname(filepath2).slice(1)

  const contentFile1 = readFile(filepath1)
  const contentFile2 = readFile(filepath2)

  if (!contentFile1.length && !contentFile2.length) {
    return ''
  }

  const parserFile1 = mapping[formatFile1](contentFile1)
  const parserFile2 = mapping[formatFile2](contentFile2)

  const tree = builderTree(parserFile1, parserFile2)

  const format = fomatters[formatName]
  return format(tree)
}
export default parser
