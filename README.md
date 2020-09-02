# Mapping and Filtering

Both functions **mapStateArray** and **filterStateArray** can be used like the **map** and **filter** functions of [Array](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array). However, if the content of the result doesn't differ from the content of the input, the input itself is returned instead of a new array.

```js
import { mapStateArray, filterStateArray } from 'state-array-functions';

const input = [1, 2, 3, 4, 5];

const oldMapped = input.map(x => x);
console.log(oldMapped === input); // ---> false

const mapped = mapStateArray(input, x => x); // mapped === input
console.log(mapped === input); // ---> true

const oldFiltered = input.filter(x ==> x);
console.log(oldFiltered === input); // ---> false

const filtered = filterStateArray(input, x => x);
console.log(filtered === input); // ---> true
```

This can be useful in reducers (e.g. for redux) to not seemingly update parts of the state which in reality didn't alter after a map or filter.

For **mapStateArray** you can define your own equality function wich is used for _each single element_, not the whole array. If no equality function is given, strict equality (===) is used. The return value should be _truthy_ if the elements are equal, _falsy_ if not.

```js
const input = [1, 2, 3, { fortyTwo: 42 }, 5];

// if a and b are objects, compare they key/value pairs
const equalityFunc = (a, b) => {
  if (typeof a === "object" && typeof b === "object") {
    const aEntries = Object.entries(a);
    return (
      aEntries.length === Object.keys(b).length &&
      !aEntries.some(([key, value]) => !equalityFunc(value, b[key]))
    );
  }

  return a === b;
};

// mapping: if input is an object, return a copy, otherwise the input itself
const mappingFunc = (e) => (typeof e === "object" ? { ...e } : e);

const mappedWithEqualityFunction = mapStateArray(
  input,
  mappingFunc,
  equalityFunc
);
const mappedWithoutEqualityFunction = mapStateArray(input, mappingFunc);

console.log(mappedWithEqualityFunction === input); // ---> true
console.log(mappedWithoutEqualityFunction === input); // ---> false
```
