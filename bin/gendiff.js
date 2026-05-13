#!/usr/bin/env node
import { program } from 'commander'
import parser from '../src/index.js'

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format [type]', ' output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((file1, file2) => {
    const compare = parser(file1, file2)
    console.log(compare)
  })

program.parse()
