const defaultEqualityFunction = (a: any, b: any) => a === b;

export type EqualityFunction<T, S> = (value1: T, value2: S) => any;

export function mapStateArray<T, S>(
  array: T[],
  func: (value: T, index: number, array: T[]) => S,
  equalityFunc: EqualityFunction<T, S> = defaultEqualityFunction
): S[] | T[] {
  let changed: boolean = false;
  const newArray: S[] = array.map((value: T, ...args) => {
    const newValue: S = func(value, ...args);
    if (!equalityFunc(value, newValue)) {
      changed = true;
    }
    return newValue;
  });

  return changed ? newArray : array;
}

export function filterStateArray<T>(
  array: T[],
  func: (value: T, index: number, array: T[]) => any
): T[] {
  let changed: boolean = false;
  const newArray = array.filter((...args) => {
    const isIn = func(...args);
    if (!isIn) {
      changed = true;
    }
    return isIn;
  });

  return changed ? newArray : array;
}
