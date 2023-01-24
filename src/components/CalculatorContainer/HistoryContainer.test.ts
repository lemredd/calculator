import { nextTick } from "vue"
import { shallowMount } from "@vue/test-utils"

import { Operations } from "@/types/buttons"

import Component from "./HistoryContainer.vue"

describe("Component: CalculatorContainer/HistoryContainer", () => {
	it("can show history list for mobile viewport", async() => {
		const props = {
			"historyList": []
		}
		const wrapper = shallowMount(Component, { props })
		const showHistoryBtn = wrapper.find(".show-history-btn")

		await showHistoryBtn.trigger("click")
		const historyListHiddenByDefault = wrapper.find(".history-list.hidden-by-default")
		expect(historyListHiddenByDefault.exists()).toBeTruthy()
	})

	it("should emit to revert evaluation to chosen history item", async() => {
		const historyItem = {
			"leftOperand": 1,
			"operation": "+" as Operations,
			"rightOperand": 1
		}
		const historyList = [ historyItem ]
		const props = {
			historyList
		}
		const wrapper = shallowMount(Component,{ props })

		// mock `isShowingHistoryList = true`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.isShowingHistoryList = true
		await nextTick()

		const historyListHiddenByDefault = wrapper.find(".history-list.hidden-by-default")
		const [historyListItem1] = historyListHiddenByDefault.findAllComponents({ "name": "HistoryListItem" })
		await historyListItem1.trigger("click")

		const expectedEmission = wrapper.emitted("revertToChosenHistory")
		expect(expectedEmission).toHaveProperty("0.0", historyItem)
	})

	it("should display items in reverse", async() => {
		const historyItem1 = {
			"leftOperand": 1,
			"operation": "+" as Operations,
			"rightOperand": 1
		}
		const historyItem2 = {
			"leftOperand": 2,
			"operation": "+" as Operations,
			"rightOperand": 2
		}
		const historyItem3 = {
			"leftOperand": 3,
			"operation": "+" as Operations,
			"rightOperand": 3
		}
		const historyList = [historyItem1, historyItem2, historyItem3]
		const props = { historyList }
		const wrapper = shallowMount(Component,{ props })

		// mock `isShowingHistoryList = true`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.isShowingHistoryList = true
		await nextTick()

		const historyListHiddenByDefault = wrapper.find(".history-list.hidden-by-default")
		const [
			historyListItem1,
			historyListItem2,
			historyListItem3
		] = historyListHiddenByDefault.findAllComponents({ "name": "HistoryListItem" })
		expect(historyListItem1.props("historyItem")).toStrictEqual(historyItem3)
		expect(historyListItem2.props("historyItem")).toStrictEqual(historyItem2)
		expect(historyListItem3.props("historyItem")).toStrictEqual(historyItem1)
	})

	it("can emit clearing of history", async() => {
		const historyItem = {
			"leftOperand": 1,
			"operation": "+" as Operations,
			"rightOperand": 1
		}
		const historyList = [ historyItem ]
		const props = {
			historyList
		}
		const wrapper = shallowMount(Component,{ props })

		// mock `isShowingHistoryList = true`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.isShowingHistoryList = true
		await nextTick()

		const clearHistoryBtn = wrapper.find(".clear-history-btn")
		await clearHistoryBtn.trigger("click")

		const expectedEmission = wrapper.emitted("clearHistory")
		expect(expectedEmission).toBeDefined()
	})
})
