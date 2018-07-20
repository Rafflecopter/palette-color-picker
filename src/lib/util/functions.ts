
interface FunctionConstructor {
  identity<T>(x: T): T
}


Function.identity = function<T>(x: T) { return x }
