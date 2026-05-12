#!/usr/bin/env node
import { program } from 'commander'
import { readFile } from './files.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', ' output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2) => {
    const readFile1 = readFile(file1)
    const readFile2 = readFile(file2)
    console.log(readFile1, file2)
  })

program.parse()
