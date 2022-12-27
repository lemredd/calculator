import { shallowMount } from "@vue/test-utils"

import Component from "./EntryScreen.vue"

describe("Component: CalculatorContainer/EntryScreen", () => {
	it("can change displayed value", async() => {
		const wrapper = shallowMount(Component, {
			"props": {
				"valueToDisplay": "0"
			}
		})
		const calculatorScreen = wrapper.find(".entry-screen")
		const calculatorScreenInitialValue = wrapper.props("valueToDisplay")
		expect(calculatorScreen.text()).toEqual(String(calculatorScreenInitialValue))

		await wrapper.setProps({
			"valueToDisplay": "1"
		})
		expect(calculatorScreen.text()).toEqual("1")
	})
})
