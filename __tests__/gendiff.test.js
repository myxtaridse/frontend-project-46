// выводит инфу в терминал
import readFile from '../src/utils/readFile.js'
import { execSync } from 'node:child_process'

// проверка пустых файлов
test('should be correct to compare two empty files with the json extension', () => {
  const expected = readFile('empty/results/result.txt').trim()
  const result = execSync(
    'node bin/gendiff.js empty/files/emptyFile1.json empty/files/emptyFile2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением json в форматерре stylish (по умолчанию)
test('should be correct to compare two files with the json extension in the stylish formatter', () => {
  const expected = readFile('json/results/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js json/files/file1.json json/files/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением yaml в форматерре stylish (по умолчанию)
test('should be correct to compare two files with the yaml extension in the stylish formatter', () => {
  const expected = readFile('yaml/results/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js yaml/files/file1.yaml yaml/files/file2.yaml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением yml в форматерре stylish (по умолчанию)
test('should be correct to compare two files with the yml extension in the stylish formatter', () => {
  const expected = readFile('yml/results/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js yml/files/file1.yml yml/files/file2.yml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением yml в форматерре stylish (с явным указанием)
test('should be correct to compare two files with the yml extension in stylish formatter with explicit format indication', () => {
  const expected = readFile('json/results/resultStylish.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f stylish json/files/file1.json json/files/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('should be correct to compare two files with the json extension in the plain formatter', () => {
  const expected = readFile('json/results/resultPlain.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f plain json/files/file1.json json/files/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('should be correct to compare two files with the yml extension in the plain formatter', () => {
  const expected = readFile('yml/results/resultPlain.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f plain yml/files/file1.yml yml/files/file2.yml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('should be correct to compare two files with the json extension in the json formatter', () => {
  const expected = readFile('json/results/resultJson.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f json json/files/file1.json json/files/file2.json',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

// сравнение двух файлов с расширением json и yaml в форматерре json
test('should be correct to compare two files with the yml extension in the json formatter', () => {
  const expected = readFile('json/results/resultJson.txt').trim()
  const result = execSync(
    'node bin/gendiff.js -f json json/files/file1.json yaml/files/file2.yaml',
    { encoding: 'utf8' },
  )
  expect(result.trim()).toEqual(expected)
})

test('incorrect way to calculate the difference by adding the wrong type of formatter', () => {
  // const expected = readFile('json/results/result.txt').trim()
  expect(() => execSync(
    'node bin/gendiff.js -f stylih yml/files/file1.yml yml/files/file2.yml',
    { encoding: 'utf8' },
  )).toThrow()
})
