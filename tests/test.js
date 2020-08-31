const { mapStateArray, filterStateArray } = require("../dist/bundle.min");

describe("Map/Filter", () => {
    let input;
    let parameterTestFunction;
    
    beforeEach(() => {
        input = [1, 2, {a: 42}, 4, 5];
        parameterTestFunction = jest.fn(x => x);
    })

    describe("Map", () => {
        test("Mapping to identities", () => {
            // act
            const mapped = mapStateArray(input, (element) => element);
    
            // assert
            expect(mapped).toBe(input);
            expect(mapped).toStrictEqual(input);
        });
    
        test("Mapping normally", () => {
            // act
            const mapped = mapStateArray(input, (element) => typeof element === "number" ? element * 2 : element);
    
            // assert
            expect(mapped).not.toBe(input);
            expect(mapped).toStrictEqual([2, 4, {a: 42}, 8, 10]);
        })

        test("Function parameters same as array.map", () => {
            // act
            mapStateArray(input, parameterTestFunction);

            // assert
            expect(parameterTestFunction.mock.calls.length).toBe(5);
            parameterTestFunction.mock.calls.forEach((call, callIndex) => {
                expect(call[0]).toBe(input[callIndex]);
                expect(call[1]).toBe(callIndex);
                expect(call[2]).toBe(input);
            })
        })
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
            const filtered = filterStateArray(input, (element) => typeof element !== "number");

            // assert
            expect(filtered).not.toBe(input);
            expect(filtered).toStrictEqual([{a: 42}]);
        })

        test("Function parameters same as array.filter", () => {
            // act
            filterStateArray(input, parameterTestFunction);

            // assert
            expect(parameterTestFunction.mock.calls.length).toBe(5);
            parameterTestFunction.mock.calls.forEach((call, callIndex) => {
                expect(call[0]).toBe(input[callIndex]);
                expect(call[1]).toBe(callIndex);
                expect(call[2]).toBe(input);
            })
        })
    })
})

