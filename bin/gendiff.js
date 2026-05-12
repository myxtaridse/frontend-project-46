#!/usr/bin/env node
import { program } from 'commander'
import { readFile } from '../files.js'
import { genDiff } from '../util.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', ' output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2) => {
    const obj1 = JSON.parse(readFile(file1))
    const obj2 = JSON.parse(readFile(file2))

    console.log(genDiff(obj1, obj2))
  })

program.parse()
