import { shallowMount } from "@vue/test-utils"

import Component from "./CalculatorScreen.vue"

describe("Component: CalculatorContainer/CalculatorScreen", () => {
	it("can change displayed value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"valueToDisplay": "0"
			}
		})
		const calculatorScreen = wrapper.find("input.calculator-screen").element as HTMLInputElement
		const calculatorScreenInitialValue = wrapper.props("valueToDisplay")
		expect(calculatorScreen.value).toEqual(calculatorScreenInitialValue)

		await wrapper.setProps({
			"valueToDisplay": "1"
		})
		expect(calculatorScreen.value).toEqual("1")
	})
})
