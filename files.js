import fs from 'fs'
import path from 'path'

const getFixturePath = filename => path.join(path.resolve(), '__fixtures__', filename)
export const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')