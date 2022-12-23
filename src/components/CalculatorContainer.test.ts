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

	it("can derive percentage as such: `entryValue * (previousEvaluatedValue / 100)`", async() => {
		const wrapper = mount(Component)
		const evaluationScrn = wrapper.find(".evaluation-screen")
		const entryScrn = wrapper.find(".entry-screen").element as HTMLInputElement

		// Find the digits "9" and "0" buttons and click them
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital9Btn, digital0Btn] = digitalBtns.filter(
			btn => btn.text() === "9" || btn.text() === "0"
		)
		await digital9Btn.trigger("click")
		expect(entryScrn.value).toEqual("9")
		await digital0Btn.trigger("click")
		expect(entryScrn.value).toEqual("90")
		expect(evaluationScrn.text()).toEqual("")

		// Find the Percentage button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [percentageBtn] = evaluationBtns.filter(btn => btn.text() === "%")
		await percentageBtn.trigger("click")

		// This implicitly expects that `previousEvaluatedValue === 0`
		expect(entryScrn.value).toEqual("0")
		expect(evaluationScrn.text()).toEqual("0")

		// Mock mutation of `previousEvaluatedValue`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.previousEvaluatedValue = "50"
		await digital9Btn.trigger("click")
		await digital0Btn.trigger("click")
		await percentageBtn.trigger("click")
		expect(entryScrn.value).toEqual("45")
		expect(evaluationScrn.text()).toEqual("45")
	})

	it.todo("can continuously evaluate")
})
