import { mount } from "@vue/test-utils"

import Component from "./CalculatorContainer.vue"

describe("Component: CalculatorContainer", () => {
	it("can evaluate a proper expression", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digit "1" button and click it
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital1Btn] = digitalBtns.filter(btn => btn.text() === "1")
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		expect(expressionScrn.text()).toEqual("")

		// Find the Addition button and click it
		const operationalBtns = wrapper.findAll(".operational-button")
		const [additionBtn] =  operationalBtns.filter(btn => btn.text() === "+")
		await additionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 +")

		// click digit "1" button again
		await digital1Btn.trigger("click")

		// Find the Equal button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [equalBtn] =  evaluationBtns.filter(btn => btn.text() === "=")
		await equalBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 + 1 =")
		expect(entryScrn.text()).toEqual("2")
	})

	it("can evaluate with incomplete operands", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digit "1" button and click it
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital1Btn] = digitalBtns.filter(btn => btn.text() === "1")
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		expect(expressionScrn.text()).toEqual("")

		// Find the Addition button and click it
		const operationalBtns = wrapper.findAll(".operational-button")
		const [additionBtn] =  operationalBtns.filter(btn => btn.text() === "+")
		await additionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 +")

		// Find the Equal button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [equalBtn] =  evaluationBtns.filter(btn => btn.text() === "=")
		await equalBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 + 1 =")
		expect(entryScrn.text()).toEqual("2")
	})

	it("can evaluate continuously with `=` button", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digit "1" button and click it
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital1Btn] = digitalBtns.filter(btn => btn.text() === "1")
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		expect(expressionScrn.text()).toEqual("")

		// Find the Addition button and click it
		const operationalBtns = wrapper.findAll(".operational-button")
		const [additionBtn] =  operationalBtns.filter(btn => btn.text() === "+")
		await additionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 +")

		// click digit "1" button again
		await digital1Btn.trigger("click")

		// Find the Equal button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [equalBtn] =  evaluationBtns.filter(btn => btn.text() === "=")
		await equalBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 + 1 =")
		expect(entryScrn.text()).toEqual("2")

		// Evaluate continuously with Equal button
		await equalBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("2 + 1 =")
		expect(entryScrn.text()).toEqual("3")
		await equalBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("3 + 1 =")
		expect(entryScrn.text()).toEqual("4")
	})

	it("can evaluate continuously if operation is already present", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digit "1" button and click it
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital1Btn] = digitalBtns.filter(btn => btn.text() === "1")
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		expect(expressionScrn.text()).toEqual("")

		// Find the Addition, Subtraction, and multiplication buttons
		const operationalBtns = wrapper.findAll(".operational-button")
		const [divisionBtn, multiplicationBtn, subtractionBtn, additionBtn] =  operationalBtns.filter(
			btn => btn.text() === "+"
			|| btn.text() === "-"
			|| btn.text() === "×"
			|| btn.text() === "÷"
		)
		await additionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1 +")

		// click digit "1" button again
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")

		await additionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("2 +")
		expect(entryScrn.text()).toEqual("2")
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		await additionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("3 +")
		expect(entryScrn.text()).toEqual("3")
		await subtractionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("3 -")
		expect(entryScrn.text()).toEqual("3")
		await digital1Btn.trigger("click")
		await subtractionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("2 -")
		await multiplicationBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("2 ×")
		await digital1Btn.trigger("click")
		await multiplicationBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("2 ×")
		await divisionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("2 ÷")
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		await divisionBtn.trigger("click")
		expect(entryScrn.text()).toEqual("2")
		expect(expressionScrn.text()).toEqual("2 ÷")
	})

	it("can derive percentage as such: `entry * (previousResult / 100)`", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digits "9" and "0" buttons and click them
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital9Btn, digital0Btn] = digitalBtns.filter(
			btn => btn.text() === "9" || btn.text() === "0"
		)
		await digital9Btn.trigger("click")
		expect(entryScrn.text()).toEqual("9")
		await digital0Btn.trigger("click")
		expect(entryScrn.text()).toEqual("90")
		expect(expressionScrn.text()).toEqual("")

		// Find the Percentage button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [percentageBtn] = evaluationBtns.filter(btn => btn.text() === "%")
		await percentageBtn.trigger("click")

		// This implicitly expects that `previousEvaluatedValue === 0`
		expect(entryScrn.text()).toEqual("0")
		expect(expressionScrn.text()).toEqual("0")

		// Mock mutation of `previousEvaluatedValue`
		const wrapperInternals = wrapper.vm as any
		wrapperInternals.previousResult = "50"
		await digital9Btn.trigger("click")
		await digital0Btn.trigger("click")
		await percentageBtn.trigger("click")
		expect(entryScrn.text()).toEqual("45")
		expect(expressionScrn.text()).toEqual("45")
	})

	it("can derive percentage as such: `entry * (previousEntry / 100)`", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digits "4" and "5" buttons and click "4"
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital4Btn, digital5Btn] = digitalBtns.filter(
			btn => btn.text() === "4" || btn.text() === "5"
		)
		await digital5Btn.trigger("click")

		// Find the Addition button and click it
		const operationalBtns = wrapper.findAll(".operational-button")
		const [additionBtn] =  operationalBtns.filter(btn => btn.text() === "+")
		await additionBtn.trigger("click")
		await digital4Btn.trigger("click")
		expect(expressionScrn.text()).toEqual("5 +")
		expect(entryScrn.text()).toEqual("4")

		// Find the Percentage button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [percentageBtn] = evaluationBtns.filter(btn => btn.text() === "%")
		await percentageBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("5 + 0.2")
	})

	it("can evaluate fraction by given entry", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		// Find the digits "1" and "2" buttons and click digit "1" button
		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital1Btn, digital2Btn] = digitalBtns.filter(
			btn => btn.text() === "1" || btn.text() === "2"
		)
		await digital1Btn.trigger("click")
		expect(entryScrn.text()).toEqual("1")
		expect(expressionScrn.text()).toEqual("")

		// Find the Fraction button and click it
		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [fractionBtn] =  evaluationBtns.filter(btn => btn.text() === "1/x")
		await fractionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1/(1)")
		expect(entryScrn.text()).toEqual("1")

		// Click digit "2" button and Fraction button
		await digital2Btn.trigger("click")
		expect(entryScrn.text()).toEqual("2")
		await fractionBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("1/(2)")
		expect(entryScrn.text()).toEqual("0.5")
	})

	it("can square given entry", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital8Btn] = digitalBtns.filter(btn => btn.text() === "8")
		await digital8Btn.trigger("click")
		expect(entryScrn.text()).toEqual("8")
		expect(expressionScrn.text()).toEqual("")

		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [sqrBtn] =  evaluationBtns.filter(btn => btn.text() === "x²")
		await sqrBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("sqr(8)")
		expect(entryScrn.text()).toEqual("64")
	})

	it("can obtain square root of given entry", async() => {
		const wrapper = mount(Component)
		const expressionScrn = wrapper.find(".expression-screen")
		const entryScrn = wrapper.find(".entry-screen")

		const digitalBtns = wrapper.findAll(".digital-button")
		const [digital9Btn] = digitalBtns.filter(btn => btn.text() === "9")
		await digital9Btn.trigger("click")
		expect(entryScrn.text()).toEqual("9")
		expect(expressionScrn.text()).toEqual("")

		const evaluationBtns = wrapper.findAll(".evaluation-button")
		const [sqrtBtn] =  evaluationBtns.filter(btn => btn.text() === "√")
		await sqrtBtn.trigger("click")
		expect(expressionScrn.text()).toEqual("√(9)")
		expect(entryScrn.text()).toEqual("3")
	})

	it("can replace entry with 0 if `!entry.length > 1", async() => {
		const wrapper = mount(Component)
		const entryScrn = wrapper.find(".entry-screen")
		const wrapperInternals = wrapper.vm as any
		const [eraseOneDigitBtn] = wrapper
			.findAll(".correction-button")
			.filter(btn => btn.text() === "backspace")

		wrapperInternals.entry = "2"
		await eraseOneDigitBtn.trigger("click")
		expect(entryScrn.text()).toEqual("0")
	})

	it("can alter integer sign if `entry !== 0`", async() => {
		const wrapper = mount(Component)
		const entryScrn = wrapper.find(".entry-screen")
		const wrapperInternals = wrapper.vm as any
		const [integerSignBtn] = wrapper
			.findAll(".digital-button")
			.filter(btn => btn.text() === "+/-")

		wrapperInternals.entry = "2"
		await integerSignBtn.trigger("click")
		expect(entryScrn.text()).toEqual("-2")
		await integerSignBtn.trigger("click")
		expect(entryScrn.text()).toEqual("2")
	})

	it("can append decimal to the rightmost area of entry", async() => {
		const wrapper = mount(Component)
		const entryScrn = wrapper.find(".entry-screen")
		const digitalBtns = wrapper.findAll(".digital-button")
		const [
			digital5Btn,
			digital2Btn,
			decimalBtn
		] = digitalBtns.filter(
			btn => btn.text() === "."
			|| btn.text() === "2"
			|| btn.text() === "5"
		)

		await digital2Btn.trigger("click")
		await decimalBtn.trigger("click")
		expect(entryScrn.text()).toEqual("2.")
		await digital5Btn.trigger("click")
		expect(entryScrn.text()).toEqual("2.5")
		await decimalBtn.trigger("click")
		expect(entryScrn.text()).toEqual("25.")
	})
})
