const path = require('path')
const convertAbsPathBasedWd = require('../convert-abs-path-based-wd')

test('Basic usage', () => {
  expect(convertAbsPathBasedWd('./doc')).toBe(`${process.cwd()}/doc`)
})

test('Target path is only directory name.', () => {
  expect(convertAbsPathBasedWd('doc')).toBe(`${process.cwd()}/doc`)
})

test('Target path has sub directories.', () => {
  expect(convertAbsPathBasedWd('doc/foo/bar')).toBe(`${process.cwd()}/doc/foo/bar`)
})

test('Target path has ../ path.', () => {
  const dirname = path.dirname(process.cwd())
  expect(convertAbsPathBasedWd('../doc')).toBe(`${dirname}/doc`)
})
