import program from 'commander';
import path from 'path';
import genDiff from './genDiff.js';


const main = () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstCon, secondCon) => {
      const firstConfigPath = path.resolve(process.cwd(), firstCon);
      const secondConfigPath = path.resolve(process.cwd(), secondCon);
      console.log(genDiff(firstConfigPath, secondConfigPath));
    });
  program.parse(process.argv);
};

export default main;
