import * as fs from 'fs-extra';
import * as path from "path";
import { build } from 'vite';
import { config } from '../vite.config';

const buildAll = async () => {
  // 全量打包
  // await build(config)
  // const packageJson = require('../package.json');
  // packageJson['main'] = 'index.umd.js';
  // packageJson['module'] = 'index.esm.js';
  // // console.log('packageJson=>',packageJson);

  // const outDir = config.build?.outDir as string

  // fs.outputFile(
  //   path.resolve(outDir, `package.json`),
  //   JSON.stringify(packageJson, null, 2)
  // )
  // console.log('packageJson=>', packageJson);

  //🚀 copy MD
  // fs.copyFileSync(
  //   path.resolve('./README.md'),
  //   path.resolve(outDir + '/README.md')
  // )



}

buildAll()