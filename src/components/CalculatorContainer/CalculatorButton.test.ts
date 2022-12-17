import { shallowMount } from "@vue/test-utils"

import Component from "./CalculatorButton.vue"

describe("Component: CalculatorContainer/Button", () => {
	it("can emit custom value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"value": 1
			}
		})
		const calculatorBtn = wrapper.find("button.calculator-button")
		const calculatorBtnValue = wrapper.props("value")
		expect(calculatorBtn.text()).toEqual(String(calculatorBtnValue))

		await calculatorBtn.trigger("click")
		const expectedEmission = wrapper.emitted("appendToScreen")
		expect(expectedEmission).toHaveProperty("0.0", calculatorBtnValue)
	})
})
