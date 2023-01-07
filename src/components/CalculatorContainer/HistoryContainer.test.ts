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

	it("can display a history item properly", async() => {
		const historyItem = {
			"leftEntry": 1,
			"operation": "+" as Operations,
			"rightEntry": 1
		}
		const historyList = [ historyItem ]
		const props = {
			historyList
		}
		const wrapper = shallowMount(Component, { props })

		// mock `isShowingHistoryList = true`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.isShowingHistoryList = true
		await nextTick()

		const historyListHiddenByDefault = wrapper.find(".history-list.hidden-by-default")
		const [historyListItem1] = historyListHiddenByDefault.findAll("li.history-item")
		const expectedTextValue = `${historyItem.leftEntry} ${historyItem.operation} ${ historyItem.rightEntry} =`
		expect(historyListItem1.text()).toEqual(expectedTextValue)
	})
})
