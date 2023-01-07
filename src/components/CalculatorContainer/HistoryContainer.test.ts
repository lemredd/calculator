import { shallowMount } from "@vue/test-utils"

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
})
