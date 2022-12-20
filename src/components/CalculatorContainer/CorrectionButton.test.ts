import { shallowMount } from "@vue/test-utils"

import Component from "./CorrectionButton.vue"

describe("Component: CalculatorContainer/CorrectionButton", () => {
	it("can emit custom value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"value": "CE"
			}
		})
		const correctionBtn = wrapper.find("button.correction-button")
		const correctionBtnValue = wrapper.props("value")
		expect(correctionBtn.text()).toEqual(String(correctionBtnValue))

		await correctionBtn.trigger("click")
		const expectedEmission = wrapper.emitted("appendToScreen")
		expect(expectedEmission).toHaveProperty("0.0", correctionBtnValue)
	})
})
