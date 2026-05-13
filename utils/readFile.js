import fs from 'node:fs'
import path from 'node:path'

const getFixturePath = filename => path.join(path.resolve(), '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

export default readFile