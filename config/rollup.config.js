import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import clear from 'rollup-plugin-clear'
import { terser } from 'rollup-plugin-terser'
// import resolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import json from 'rollup-plugin-json'

export default args => {
  const config = {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/modux.js',
        format: 'umd',
        name: 'modux',
      },
    ],
    plugins: [
      // resolve(),
      // commonjs(), // 兼容 commonjs 规范的第三方模块使用 ES6 方式导入
      // json(),
      babel({
        exclude: 'node_modules/**',
      }),
      clear({ targets: ['dist'] }),
      args.server ? serve({
        open: true, // 是否打开浏览器
        contentBase: ['demo', 'dist'],
        historyApiFallback: true, // 404 错误是否返回 index.html
        host: 'localhost',
        port: 10001,
      }) : undefined,
    ],
  }

  if (args.mini) {
    config.output = [{
      file: 'dist/modux.mini.js',
      format: 'umd',
      name: 'modux',
    }]
    config.plugins.push(...[terser()])
  }
  
  return config
}
