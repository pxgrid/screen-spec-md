const generateSpec = require('../../lib/generate-spec')

exports.command = ['* [options]', 'generate']

exports.describe = 'Generate spec files from markdown'

exports.builder = yargs => {
  yargs.options({
    m: {
      alias: 'mdDir',
      demandOption: true,
      requiresArg: true,
      describe: 'Path of the source(markdown) directory',
      type: 'string',
    },
    d: {
      alias: 'destDir',
      demandOption: true,
      requiresArg: true,
      describe: 'Path of directory to generated spec files',
      type: 'string',
    },
  })
}

exports.handler = async argv => {
  await generateSpec(argv.mdDir, argv.destDir, { isEditable: false })
}
