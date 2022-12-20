import { shallowMount } from "@vue/test-utils"

import Component from "./EvaluationButton.vue"

describe("Component: CalculatorContainer/EvaluationButton", () => {
	it("can emit custom value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"value": "="
			}
		})
		const evaluationBtn = wrapper.find("button.evaluation-button")
		const evaluationBtnValue = wrapper.props("value")
		expect(evaluationBtn.text()).toEqual(String(evaluationBtnValue))

		await evaluationBtn.trigger("click")
		const expectedEmission = wrapper.emitted("appendToScreen")
		expect(expectedEmission).toHaveProperty("0.0", evaluationBtnValue)
	})
})
