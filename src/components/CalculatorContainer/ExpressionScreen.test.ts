import { shallowMount } from "@vue/test-utils"

import Component from "./ExpressionScreen.vue"

describe("Component: CalculatorContainer/ExpressionScreen", () => {
	it("can determine expression to display", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "",
				"evaluation": null,
				"hasPreviousEntry": true,
				"operation": "+",
				"previousEntry": 1,
				"previousExpressionEvaluated": ""
			}
		})
		const calculatorScreen = wrapper.find(".expression-screen")
		const expectedInitialTextValue = "1 +"
		expect(calculatorScreen.text()).toEqual(expectedInitialTextValue)

		await wrapper.setProps({
			"evaluation": "=",
			"previousExpressionEvaluated": "1+1"
		})
		const expectedFinalTextValue = "1 + 1 ="
		expect(calculatorScreen.text()).toEqual(expectedFinalTextValue)
	})

	it("must have distinct class if `valueToDisplay` is empty", () => {
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "",
				"evaluation": null,
				"hasPreviousEntry": false,
				"operation": null,
				"previousEntry": null,
				"previousExpressionEvaluated": ""
			}
		})

		const calculatorScreen = wrapper.find(".expression-screen")
		expect(calculatorScreen.classes()).toContain("empty")
	})
})
