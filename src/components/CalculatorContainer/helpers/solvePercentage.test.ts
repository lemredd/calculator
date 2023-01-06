import helper from "./solvePercentage"

describe("Component Helper: solvePercentage", () => {
	it("can solve percentage", () => {
		expect(helper(100, 50)).toEqual(50)
		expect(helper(90, 50)).toEqual(45)
	})
})
