const fs = require('fs-extra-promise')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.js')
const buildPath = path.join(__dirname, 'build')

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  cache: false,
  devtool: 'source-map',
  entry: {
    bundle: path.join(__dirname, 'src/config/client.js')
  },
  output: {
    path: buildPath,
    publicPath: '/build/'
  }
})

// Production plugins for old browsers
//------------------------------------
config.module.loaders.forEach(loader => {
  if (loader.loader === 'babel-loader') {
    loader.query.plugins.push(
      "transform-es2015-arrow-functions",
      "transform-es2015-block-scoped-functions",
      "transform-es2015-block-scoping",
      "transform-es2015-classes",
      "transform-es2015-computed-properties",
      "transform-es2015-literals",
      "transform-es2015-parameters",
      "transform-es2015-shorthand-properties",
      "transform-es2015-spread",
      "transform-es2015-template-literals"
    )
  }
})

console.info('Clearing Build Path')

fs.emptyDirSync(buildPath)

console.info('Environment: Production')

// Save files to disk
//-------------------------------
config.output.path = path.join(__dirname, 'build')
config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    },
    output: {
      comments: false
    }
  })
)

// Set some environment variables
//-------------------------------
config.plugins.push(new webpack.DefinePlugin({
  'process.env.DEV': false,
  'process.env.BROWSER': true,
  'process.env.NODE_ENV': JSON.stringify('production')
}))

// Sanity checks
//-------------------------------
if (config.devtool === 'eval') {
  throw new Error('Using "eval" source-maps may break the build')
}

// Compile everything for PROD
//-------------------------------
const compiler = webpack(config)
compiler.run(function(err, stats) {
  if (err) throw err

  // Output stats
  console.log(stats.toString({
    colors: true,
    hash: false,
    timings: false,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  }))

  // Write a stats.json for the webpack bundle visualizer
  //writeWebpackStats(stats)

  if (stats.hasErrors()) {
    console.error(stats.compilation.errors.toString())
  }
  console.info('Finished compiling')
})

/**
 * Writes a stats.json for the webpack bundle visualizer
 * URL: https://chrisbateman.github.io/webpack-visualizer/
 * @param stats
 */
function writeWebpackStats(stats) {
  const { resolve } = require('path')
  const location = resolve(config.output.path, 'stats.json')
  require('fs').writeFileSync(location, JSON.stringify(stats.toJson()))
  console.debug(`Wrote stats.json to ${location}`)
}
