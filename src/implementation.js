export function mapStateArray(array, func) {
    let changed = false;
    const newArray = array.map((value, ...args) => {
      const newValue = func(value, ...args);
      if (newValue !== value) {
        changed = true;
      }
      return newValue;
    });
  
    return changed ? newArray : array;
  }
  
  export function filterStateArray(array, func) {
    let changed = false;
    const newArray = array.filter((...args) => {
      const isIn = func(...args);
      if (!isIn) {
        changed = true;
      }
      return isIn;
    });
  
    return changed ? newArray : array;
  }