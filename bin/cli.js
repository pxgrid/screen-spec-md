#!/usr/bin/env node

const convertAbsPathBasedWd = require('../lib/utils/convert-abs-path-based-wd')

const argv = require('yargs')
  .commandDir('commands')
  .coerce(['mdDir', 'destDir'], convertAbsPathBasedWd).argv
