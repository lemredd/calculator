import helper from "./evaluate"

describe("Component Helper: evaluate", () => {
	it("can evaluate based on given math expression in string", () => {
		expect(helper("1+1")).toEqual(2)
	})
})
