// выводит инфу в терминал
import readFile from '../utils/readFile.js'
import { execSync } from 'node:child_process'

// проверка пустых файлов
test('should be correct to compare two empty files with the json extension', () => {
  const expected = readFile('empty/result.txt').trim()
  const result = execSync(
    'node bin/gendiff.js empty/emptyFile1.json empty/emptyFile2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением json в форматерре stylish (по умолчанию)
test('should be correct to compare two files with the json extension in the stylish formatter', () => {
  const expected = readFile('json/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js json/file1.json json/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением yaml в форматерре stylish (по умолчанию)
test('should be correct to compare two files with the yaml extension in the stylish formatter', () => {
  const expected = readFile('yaml/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js yaml/file1.yaml yaml/file2.yaml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением yml в форматерре stylish (по умолчанию)
test('should be correct to compare two files with the yml extension in the stylish formatter', () => {
  const expected = readFile('yml/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js yml/file1.yml yml/file2.yml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением yml в форматерре stylish (с явным указанием)
test('should be correct to compare two files with the yml extension in stylish formatter with explicit format indication', () => {
  const expected = readFile('json/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f stylish json/file1.json json/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('should be correct to compare two files with the json extension in the plain formatter', () => {
  const expected = readFile('json/resultPlain.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f plain json/file1.json json/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('should be correct to compare two files with the yml extension in the plain formatter', () => {
  const expected = readFile('yml/resultPlain.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f plain yml/file1.yml yml/file2.yml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// test('incorrect way to calculate the difference by adding the wrong type of formatter', () => {
//   const expected = readFile('yml/result.txt').trim()
//   const result = execSync(
//     'node bin/gendiff.js -f stylih yml/file1.yml yml/file2.yml',
//     { encoding: 'utf8' },
//   )
//   expect(result.trim()).toThrow()
// })
