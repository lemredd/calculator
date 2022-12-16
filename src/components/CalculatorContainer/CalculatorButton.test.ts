import { shallowMount } from "@vue/test-utils"

import Component from "./CalculatorButton.vue"

describe("Component: CalculatorContainer/Button", () => {
	it("can emit custom value", () => {
		const wrapper = shallowMount(Component)

		console.log(wrapper.html(), "\n\n\n")
	})
})
