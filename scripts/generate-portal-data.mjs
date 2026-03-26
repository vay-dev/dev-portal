import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const appRoot = path.resolve('C:/mobile-projects/flutter/pendu/dev-portal')
const sourcePath = path.resolve(appRoot, '../pendu-mobile/devportal/data.js')
const outputPath = path.resolve(appRoot, 'src/data/generatedPortalData.ts')

const code = fs.readFileSync(sourcePath, 'utf8')

const context = {
  module: { exports: {} },
  exports: {},
}

vm.createContext(context)
vm.runInContext(code, context)

const { PROJECT, LAYERS, FEATURES } = context.module.exports

if (!PROJECT || !LAYERS || !FEATURES) {
  throw new Error('Failed to extract PROJECT, LAYERS, and FEATURES from devportal/data.js')
}

const banner = `// This file is generated from ../pendu-mobile/devportal/data.js\n// Run: node scripts/generate-portal-data.mjs\n\n`
const body = [
  `export const PROJECT = ${JSON.stringify(PROJECT, null, 2)} as const;`,
  `export const LAYERS = ${JSON.stringify(LAYERS, null, 2)} as const;`,
  `export const FEATURES = ${JSON.stringify(FEATURES, null, 2)} as const;`,
].join('\n\n')

fs.writeFileSync(outputPath, `${banner}${body}\n`)

console.log(`Generated ${path.relative(appRoot, outputPath)}`)
