import { shallowMount } from "@vue/test-utils"

import Component from "./OperationalButton.vue"

describe("Component: CalculatorContainer/OperationalButton", () => {
	it("can emit custom value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"value": "+"
			}
		})
		const operationalBtn = wrapper.find("button.operational-button")
		const operationalBtnValue = wrapper.props("value")
		expect(operationalBtn.text()).toEqual(String(operationalBtnValue))

		await operationalBtn.trigger("click")
		const expectedEmission = wrapper.emitted("appendToScreen")
		expect(expectedEmission).toHaveProperty("0.0", operationalBtnValue)
	})
})
