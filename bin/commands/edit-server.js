const express = require('express')

const { productionEditable } = require('../../server/editable')

const app = express()

exports.command = 'edit-server [options]'

exports.describe = 'Serve editable server to edit spec markdown.'

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
      describe: 'Path of directory to write out converted html',
      type: 'string',
    },
    p: {
      alias: 'port',
      default: 3001,
      requiresArg: true,
      describe: 'Port of server',
      type: 'number',
    },
  })
}

exports.handler = argv => {
  productionEditable(app, argv.mdDir, argv.destDir, argv.port)
}
