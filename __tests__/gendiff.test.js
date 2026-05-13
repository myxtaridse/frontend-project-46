// выводит инфу в терминал
import readFile from '../utils/readFile.js'
import { execSync } from 'node:child_process'

let expected
beforeAll(() => {
  expected = readFile('result.txt').trim()
})

test('should be correct to compare two files with the json extension', () => {
  const result = execSync(
    'node bin/gendiff.js file1.json file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('should be correct to compare two files with the yaml extension', () => {
  const result = execSync(
    'node bin/gendiff.js file1.yaml file2.yaml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})
