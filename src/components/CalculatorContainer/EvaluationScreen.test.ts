import { shallowMount } from "@vue/test-utils"

import Component from "./EvaluationScreen.vue"

describe("Component: CalculatorContainer/EvaluationScreen", () => {
	it("can change displayed value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"valueToDisplay": "0"
			}
		})
		const calculatorScreen = wrapper.find("input.evaluation-screen").element as HTMLInputElement
		const calculatorScreenInitialValue = wrapper.props("valueToDisplay")
		expect(calculatorScreen.value).toEqual(calculatorScreenInitialValue)

		await wrapper.setProps({
			"valueToDisplay": "1"
		})
		expect(calculatorScreen.value).toEqual("1")
	})
})
