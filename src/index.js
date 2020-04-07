import program from 'commander';
import genDiff from './genDiff';


const main = () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format', 'object')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig, cmdObj) => {
      console.log(genDiff(firstConfig, secondConfig, cmdObj.format));
    });
  program.parse(process.argv);
};

export default main;
