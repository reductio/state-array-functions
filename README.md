# Mapping and Filtering

Both functions **mapStateArray** and **filterStateArray** can be used like the **map** and **filter** functions of [Array](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array). However, if the content of the result doesn't differ from the content of the input, the input itself is returned instead of a new array.

```js
import {mapStateArray, filterStateArray} from 'state-array-functions';

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