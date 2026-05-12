// выводит инфу в терминал
import { readFile } from '../files'
import { execSync } from 'child_process'

let expected
beforeAll(() => {
  expected = readFile('result.txt').trim()
})

test('should compare two files correctly', () => {
  const result = execSync(
    'node bin/gendiff.js file1.json file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})
