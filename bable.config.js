module.exports = function (api) {
  api.cache(true)

  const presets = [
    ['@babel/preset-env', { target: { node: 'current' } }],
  ]

  return {
    presets,
  }
}
