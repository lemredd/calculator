import { shallowMount } from "@vue/test-utils"

import type { Operations } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"
import solvePercentage from "@/CalculatorContainer/helpers/solvePercentage"

import Component from "./EvaluationButton.vue"

describe("Component: CalculatorContainer/EvaluationButton", () => {
	it("can emit evaluation result based on expression", async() => {
		const expressionToEvaluate = "1+1"
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": "+" as Operations,
			"previousEntry": null,
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				expressionAndPreviousResultInformation,
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
			"operation": "+" as Operations,
			"previousEntry": null,
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				expressionAndPreviousResultInformation,
				expressionToEvaluate,
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

	it("can derive percentage as such: `entry * (previousResult / 100)`", async() => {
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": null,
			"previousEntry": null,
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "90",
				expressionAndPreviousResultInformation,
				"expressionToEvaluate": "",
				"value": "%"
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		const base = wrapper.props("entry")
		const { "previousResult": percent } = wrapper.props("expressionAndPreviousResultInformation")
		const expectedEvaluationResult = solvePercentage(Number(base), Number(percent))
		expect(expectedEmission).toHaveProperty("0.1", expectedEvaluationResult)
	})

	it("can derive percentage as such: `entry * (previousEntry / 100)`", async() => {
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": "+" as Operations,
			"previousEntry": 5,
			"previousResult": "0",
			"rightEntry": 4
		}
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "4",
				expressionAndPreviousResultInformation,
				"expressionToEvaluate": "5+4",
				"value": "%"
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		const base = wrapper.props("entry")
		const { "previousEntry": percent } = wrapper.props("expressionAndPreviousResultInformation")
		const expectedEvaluationResult = solvePercentage(Number(base), Number(percent))
		expect(expectedEmission).toHaveProperty("0.1", expectedEvaluationResult)
	})

	it("can evaluate fraction by given entry", async() => {
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": null,
			"previousEntry": null,
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "4",
				expressionAndPreviousResultInformation,
				"expressionToEvaluate": "",
				"value": "1/x"
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		const { entry } = wrapper.props()
		const expectedEvaluationResult = 1 / entry
		expect(expectedEmission).toHaveProperty("0.1", expectedEvaluationResult)
	})

	it("can square given entry", async() => {
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": null,
			"previousEntry": null,
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "8",
				expressionAndPreviousResultInformation,
				"expressionToEvaluate": "",
				"value": "x²"
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		const { entry } = wrapper.props()
		const expectedEvaluationResult = entry * entry
		expect(expectedEmission).toHaveProperty("0.1", expectedEvaluationResult)
	})

	it("can obtain square root of given entry", async() => {
		const expressionAndPreviousResultInformation = {
			"hasSavedPreviousResult": false,
			"operation": null,
			"previousEntry": null,
			"previousResult": "0",
			"rightEntry": null
		}
		const wrapper = shallowMount(Component, {
			"props": {
				"entry": "9",
				expressionAndPreviousResultInformation,
				"expressionToEvaluate": "",
				"value": "√"
			}
		})
		const evaluationBtn = wrapper.find(".evaluation-button")
		await evaluationBtn.trigger("click")

		const expectedEmission = wrapper.emitted("emitEvaluationResult")
		const { entry } = wrapper.props()
		const expectedEvaluationResult = Math.sqrt(entry)
		expect(expectedEmission).toHaveProperty("0.1", expectedEvaluationResult)
	})
})
