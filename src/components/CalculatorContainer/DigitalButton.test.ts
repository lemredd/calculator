import { shallowMount } from "@vue/test-utils"

import Component from "./DigitalButton.vue"

describe("Component: CalculatorContainer/DigitalButton", () => {
	it("can emit custom value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"value": 1
			}
		})
		const digitalBtn = wrapper.find("button.digital-button")
		const digitalBtnValue = wrapper.props("value")
		expect(digitalBtn.text()).toEqual(String(digitalBtnValue))

		await digitalBtn.trigger("click")
		const expectedEmission = wrapper.emitted("appendToScreen")
		expect(expectedEmission).toHaveProperty("0.0", digitalBtnValue)
	})
})
