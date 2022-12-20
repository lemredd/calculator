import { shallowMount } from "@vue/test-utils"

import { Corrections } from "@/types/buttons"

import Component from "./CorrectionButton.vue"

describe("Component: CalculatorContainer/CorrectionButton", () => {
	it("can emit clearing of user entry screen", async() => {
		const props = {
			"value": "CE" as Corrections
		}
		const wrapper = shallowMount(Component, {
			props
		})
		const correctionBtn = wrapper.find("button.correction-button")

		await correctionBtn.trigger("click")
		expect(wrapper.emitted()).toHaveProperty(("clearEntryScreen"))
	})

	it("can emit clearing of all screens", async() => {
		const props = {
			"value": "C" as Corrections
		}
		const wrapper = shallowMount(Component, {
			props
		})
		const correctionBtn = wrapper.find("button.correction-button")

		await correctionBtn.trigger("click")
		expect(wrapper.emitted()).toHaveProperty(("clearAllScreens"))
	})

	it("can emit clearing of one digit", async() => {
		const props = {
			"value": "" as Corrections
		}
		const wrapper = shallowMount(Component, {
			props
		})
		const correctionBtn = wrapper.find("button.correction-button")

		await correctionBtn.trigger("click")
		expect(wrapper.emitted()).toHaveProperty(("clearOneDigit"))
	})
})
