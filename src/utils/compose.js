export default function compose(...args) {
  if (args.length === 1) {
    return args[0]
  }
  return args.reduce((a, b) => (...args) => a(b(...args)))
}
