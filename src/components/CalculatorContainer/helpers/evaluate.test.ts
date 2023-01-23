import helper from "./evaluate"

describe("Component Helper: evaluate", () => {
	it("can evaluate based on given math expression in string", () => {
		expect(helper("1+1")).toEqual(2)
	})

	it("can substitute proper multiplication and division symbols", () => {
		expect(helper("2×2")).toEqual(4)
		expect(helper("2÷2")).toEqual(1)
	})

	it("can output expression on error", () => {
		const expression = "2+null"
		const errorMessage = `Can't understand after null (expression: ${expression})`
		expect(() => helper(expression)).toThrow(errorMessage)
	})
})
