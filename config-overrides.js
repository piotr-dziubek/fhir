module.exports = function override (config) {
  let loaders = config.resolve
  loaders.fallback = {
    "fs": false,
    "tls": false,
    "net": false,
    "https": false,
    "stream": require.resolve("stream-browserify"),
    "crypto": require.resolve("crypto-browserify")  }

  return config
}
