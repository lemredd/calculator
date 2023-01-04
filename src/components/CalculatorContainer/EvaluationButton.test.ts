import { shallowMount } from "@vue/test-utils"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import Component from "./EvaluationButton.vue"

describe("Component: CalculatorContainer/EvaluationButton", () => {
	it("can emit custom value", async() => {
		const expressionToEvaluate = "1+1"
		const wrapper = shallowMount(Component, {
			"props": {
				expressionToEvaluate,
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

	it("can emit evaluation result based on expression", async() => {
		const expressionToEvaluate = "1+1"
		const wrapper = shallowMount(Component, {
			"props": {
				expressionToEvaluate,
				"value": "="
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const expectedEvaluationResult = evaluate(expressionToEvaluate)
		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		expect(expectedEmission).toHaveProperty("0.0", expectedEvaluationResult)
	})
})
