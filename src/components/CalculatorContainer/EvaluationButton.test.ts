import { shallowMount } from "@vue/test-utils"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import Component from "./EvaluationButton.vue"

describe("Component: CalculatorContainer/EvaluationButton", () => {
	it("can emit evaluation result based on expression", async() => {
		const expressionToEvaluate = "1+1"
		const wrapper = shallowMount(Component, {
			"props": {
				expressionToEvaluate,
				"value": "="
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		const evaluationBtnValue = wrapper.props("value")
		await evaluationBtn.trigger("click")

		const expectedEvaluationResult = evaluate(expressionToEvaluate)
		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		expect(expectedEmission).toHaveProperty("0.0", evaluationBtnValue)
		expect(expectedEmission).toHaveProperty("0.1", expectedEvaluationResult)
	})

	it("can evaluate continuously with `=` button", async() => {
		const expressionToEvaluate = "1+1"
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": "+",
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				expressionAndPreviousResultInformation,
				expressionToEvaluate,
				"operation": "+",
				"value": "="
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const updatedExpressionToEvaluate = "2+1"
		const updatedexpressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": true,
			"operation": "+",
			"previousResult": 2,
			"rightEntry": 1
		}
		await wrapper.setProps({
			"expressionAndPreviousResultInformation": updatedexpressionAndPreviousResultInformation,
			"expressionToEvaluate": updatedExpressionToEvaluate
		})
		await evaluationBtn.trigger("click")

		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		const expectedEvaluationResult = evaluate(updatedExpressionToEvaluate)
		expect(expectedEmission).toHaveProperty("1.1", expectedEvaluationResult)
	})
})
