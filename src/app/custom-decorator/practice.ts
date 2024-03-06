function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // a reference to our original method
  const originalMethod = descriptor.value;

  // hash map to cache function call results
  let cache = new Map();

  descriptor.value = function(...args: any[]) {
    // create a string key for the map by joining all args with ','
    const argsKey = args.join(",")
    // if key found return from cache
    if (cache.has(argsKey)) {
      return cache.get(argsKey);
    }
    console.log(this,"What is this ???");
    // calculate result from original method
    const result = originalMethod.apply(this, args);

    // add new value to cache
    cache.set(argsKey, result);
    return result;
  };

  console.log("I will run evry time")
  return descriptor;
}


class MyClass {
  // this is our decorator
  @memoize
  // recursive implementation of the fibonacci algorithm
  public fibonacci(num: number): number {
    if (num <= 1) return 1;
    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }
}

// create new instance of myclass
const myInstance = new MyClass();

// print the first 12 fibonnaci numbers
for (let i = 0; i < 12; i++) {
  console.log(myInstance.fibonacci(i));
}

for (let i = 0; i < 12; i++) {
  console.log(myInstance.fibonacci(i));
}
