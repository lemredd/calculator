import { mount } from "@vue/test-utils"

import Component from "./CalculatorContainer.vue"

describe("Component: CalculatorContainer", () => {
	it("can evaluate a proper expression", async() => {
		const wrapper = mount(Component)
		const evaluationScrn = wrapper.find(".evaluation-screen")
		const entryScrn = wrapper.find(".entry-screen").element as HTMLInputElement

		// Find the digit "1" button and click it
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital1Btn] = digitalBtns.filter(btn => btn.text() === "1")
		await digital1Btn.trigger("click")
		expect(entryScrn.value).toEqual("1")
		expect(evaluationScrn.text()).toEqual("")

		// Find the Addition button and click it
		const operationalBtns = wrapper.findAll(".operational-button")
		const [additionBtn] =  operationalBtns.filter(btn => btn.text() === "+")
		await additionBtn.trigger("click")
		expect(evaluationScrn.text()).toEqual("1 +")

		// click digit "1" button again
		await digital1Btn.trigger("click")
		expect(entryScrn.value).toEqual("1")

		// // Find the Equal button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [equalBtn] =  evaluationBtns.filter(btn => btn.text() === "=")
		await equalBtn.trigger("click")
		expect(evaluationScrn.text()).toEqual("1 + 1 =")
		expect(entryScrn.value).toEqual("2")
	})

	it.todo("can continuously evaluate")
})
