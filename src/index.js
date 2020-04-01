import program from 'commander';
import path from 'path';
import genDiff from './genDiff.js';


const main = () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstCon, secondCon) => {
      const firstConfigFullPath = path.resolve(process.cwd(), firstCon);
      const secondConfigFullPath = path.resolve(process.cwd(), secondCon);
      console.log(genDiff(firstConfigFullPath, secondConfigFullPath));
    });
  program.parse(process.argv);
};

export default main;
