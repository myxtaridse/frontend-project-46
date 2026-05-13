import readFile from '../utils/readFile.js'
import path from 'node:path'
import jsonParse from './parsers/jsonParse.js'
import yamlParse from './parsers/yamlParse.js'
import genDiff from '../utils/genDiff.js'

const mapping = {
  json: jsonParse,
  yaml: yamlParse,
}

const parser = (filepath1, filepath2) => {
  const formatFile1 = path.extname(filepath1).slice(1)
  const formatFile2 = path.extname(filepath2).slice(1)

  const contentFile1 = readFile(filepath1)
  const contentFile2 = readFile(filepath2)

  const parserFile1 = mapping[formatFile1](contentFile1)
  const parserFile2 = mapping[formatFile2](contentFile2)

  return genDiff(parserFile1, parserFile2)
}
export default parser
