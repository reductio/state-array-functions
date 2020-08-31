import { mapStateArray, filterStateArray } from "../src/implementation";

describe("Map/Filter", () => {
  let input: Array<number | object>;
  let parameterTestFunction: <T>(x: T) => T;

  beforeEach(() => {
    input = [1, 2, { a: 42 }, 4, 5];
    parameterTestFunction = jest.fn((x) => x);
  });

  describe("Map", () => {
    test("Mapping to identities", () => {
      // act
      const mapped = mapStateArray(input, <T>(element: T) => element);

      // assert
      expect(mapped).toBe(input);
      expect(mapped).toStrictEqual(input);
    });

    test("Mapping normally", () => {
      // act
      const mapped = mapStateArray(input, <T>(element: T) =>
        typeof element === "number" ? element * 2 : element
      );

      // assert
      expect(mapped).not.toBe(input);
      expect(mapped).toStrictEqual([2, 4, { a: 42 }, 8, 10]);
    });

    test("Custom equality function", () => {
      // prepare
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

      const mappingFunc = (e) => (typeof e === "object" ? { ...e } : e);

      // act
      const mapped_without_equalityFunc = mapStateArray(input, mappingFunc);
      const mapped_with_equalityFunc = mapStateArray(
        input,
        mappingFunc,
        equalityFunc
      );

      // assert
      expect(mapped_without_equalityFunc).not.toBe(input);
      expect(mapped_without_equalityFunc).toStrictEqual(input);
      expect(mapped_with_equalityFunc).toBe(input);
      expect(mapped_with_equalityFunc).toStrictEqual(input);
    });

    test("Function parameters same as array.map", () => {
      // act
      mapStateArray(input, parameterTestFunction);

      // assert
      expect(parameterTestFunction.mock.calls.length).toBe(5);
      parameterTestFunction.mock.calls.forEach((call, callIndex) => {
        expect(call[0]).toBe(input[callIndex]);
        expect(call[1]).toBe(callIndex);
        expect(call[2]).toBe(input);
      });
    });
  });

  describe("Filter", () => {
    test("Filtering nothing", () => {
      // act
      const filtered = filterStateArray(input, (element) => true);

      // assert
      expect(filtered).toBe(input);
      expect(filtered).toStrictEqual(input);
    });

    test("Filtering normally", () => {
      // act
      const filtered = filterStateArray(
        input,
        (element) => typeof element !== "number"
      );

      // assert
      expect(filtered).not.toBe(input);
      expect(filtered).toStrictEqual([{ a: 42 }]);
    });

    test("Function parameters same as array.filter", () => {
      // act
      filterStateArray(input, parameterTestFunction);

      // assert
      expect(parameterTestFunction.mock.calls.length).toBe(5);
      parameterTestFunction.mock.calls.forEach((call, callIndex) => {
        expect(call[0]).toBe(input[callIndex]);
        expect(call[1]).toBe(callIndex);
        expect(call[2]).toBe(input);
      });
    });
  });
});
