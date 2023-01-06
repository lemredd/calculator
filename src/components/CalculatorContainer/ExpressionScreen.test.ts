import { shallowMount } from "@vue/test-utils"

import Component from "./ExpressionScreen.vue"

describe("Component: CalculatorContainer/ExpressionScreen", () => {
	it("can change displayed value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"valueToDisplay": "0"
			}
		})
		const calculatorScreen = wrapper.find(".expression-screen")
		const calculatorScreenInitialValue = wrapper.props("valueToDisplay")
		expect(calculatorScreen.text()).toEqual(calculatorScreenInitialValue)

		await wrapper.setProps({
			"valueToDisplay": "1"
		})
		expect(calculatorScreen.text()).toEqual("1")
	})

	it("must have distinct class if `valueToDisplay` is empty", () => {
		const wrapper = shallowMount(Component, {
			"props": {
				"valueToDisplay": ""
			}
		})

		const calculatorScreen = wrapper.find(".expression-screen")
		expect(calculatorScreen.classes()).toContain("empty")
	})
})
