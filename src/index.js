import program from 'commander';
import genDiff from './genDiff.js';

const main = () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .usage('[options] <firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format');
  program.parse(process.argv);
  console.log(genDiff('test1.json', 'test2.json'));
};

export default main;
