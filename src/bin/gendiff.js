#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index';

program.version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'set output format, valid output formats: pretty, plain, json', 'pretty')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig, cmdObj) => {
    console.log(genDiff(firstConfig, secondConfig, cmdObj.format));
  });
program.parse(process.argv);
