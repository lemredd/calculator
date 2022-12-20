import { mount } from "@vue/test-utils"

import Component from "./CalculatorContainer.vue"

describe("Component: CalculatorContainer", () => {
	it("can change screen value once a button is pressed", async() => {
		const wrapper = mount(Component)
		const digitalBtn = wrapper.find(".digital-button")
		const calculatorScreen = wrapper.find(".calculator-screen").element as HTMLInputElement

		await digitalBtn.trigger("click")
		expect(calculatorScreen.value).not.toEqual("0")
	})
})
