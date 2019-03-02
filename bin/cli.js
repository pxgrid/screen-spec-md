#!/usr/bin/env node

const program = require('commander')
const version = require('../package.json').version
const run = require('./run')

program
  .version(version)
  .option('-m, --mdDir [path]', 'Source directory which store spec markdown files.')
  .option('-d, --destDir [path]', 'Specify output spec document directory.')

program.parse(process.argv)

const { mdDir, destDir } = program
if (!mdDir || !destDir) {
  console.err('Please specify mdDir and destDir')
  process.exit(1)
}

run(mdDir, destDir)
