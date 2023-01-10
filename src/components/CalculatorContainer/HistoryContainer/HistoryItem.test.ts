import { nextTick } from "vue"
import { shallowMount } from "@vue/test-utils"

import { Operations } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"
import joinHistoryItemParts from "@/CalculatorContainer/HistoryContainer/helpers/joinHistoryItemParts"

import Component from "./HistoryItem.vue"

describe("Component: HistoryContainer/HistoryItem", () => {
	it("can display a history item properly", async() => {
		const historyItem = {
			"leftOperand": 1,
			"operation": "+" as Operations,
			"rightOperand": 1
		}
		const props = {
			historyItem
		}
		const wrapper = shallowMount(Component, { props })

		// mock `isShowingHistoryList = true`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.isShowingHistoryList = true
		await nextTick()

		const historyListItem = wrapper.find("li.history-item")

		const expression = historyListItem.find(".expression")
		const joinedHistoryItemParts = joinHistoryItemParts(historyItem)
		const expectedExpressionTextValue = `${joinedHistoryItemParts} =`
		expect(expression.text()).toEqual(expectedExpressionTextValue)

		const result = historyListItem.find(".result")
		const expectedResult = evaluate(joinedHistoryItemParts)
		expect(result.text()).toEqual(String(expectedResult))
	})
})
