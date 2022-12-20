import { shallowMount } from "@vue/test-utils"

import Component from "./MemoryButton.vue"

describe("Component: CalculatorContainer/MemoryButton", () => {
	it("can emit custom value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"value": "MC"
			}
		})
		const memoryBtn = wrapper.find("button.memory-button")
		const memoryBtnValue = wrapper.props("value")
		expect(memoryBtn.text()).toEqual(String(memoryBtnValue))

		await memoryBtn.trigger("click")
		const expectedEmission = wrapper.emitted("appendToScreen")
		expect(expectedEmission).toHaveProperty("0.0", memoryBtnValue)
	})
})
