import program from 'commander';

const main = () => {
  program.version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .usage('[options] <firstConfig> <secondConfig>')
    .option('-f, --format [type]', 'output format');

  program.parse(process.argv);
};

export default main;
