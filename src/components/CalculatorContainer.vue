<script setup lang="ts">
import { computed, ref } from "vue"

import type {
	Entries,
	Operations,
	Evaluations
} from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import EntryScreen from "@/CalculatorContainer/EntryScreen.vue"
import DigitalButton from "@/CalculatorContainer/DigitalButton.vue"
import ExpressionScreen from "@/CalculatorContainer/ExpressionScreen.vue"
import EvaluationButton from "@/CalculatorContainer/EvaluationButton.vue"
import CorrectionButton from "@/CalculatorContainer/CorrectionButton.vue"
import OperationalButton from "@/CalculatorContainer/OperationalButton.vue"

const entry = ref("")
const mustClearEntryOnNextAppend = ref(false)
const previousEntry = ref<number|null>(null)
const operation = ref<Operations|null>(null)
const rightEntry = ref<number|null>(null)
const previousResult = ref("0")
const previousExpressionEvaluated = ref("")
const evaluation = ref<Evaluations|null>(null)

function solvePercentage(base: number, percent: number) {
	const percentInDecimal = percent / 100
	const percentageResult = String(evaluate(`${base} * ${percentInDecimal}`))
	return percentageResult
}

const hasPreviousEntry = computed(() => Boolean(previousEntry.value) && Boolean(operation.value))
const expressionToEvaluate = computed({
	get() {
		let value = ""

		if (previousEntry.value) value += previousEntry.value
		if (operation.value) value += operation.value

		if (!entry.value) value += previousEntry.value
		else if (hasPreviousEntry.value && entry.value) value  += entry.value

		return value
	}, set(newValue: string) {
		previousExpressionEvaluated.value = newValue
	}
})
const expressionToDisplay = computed(() => {
	let value = `${previousEntry.value ? previousEntry.value : ""} ${operation.value ? operation.value : ""}`

	switch(evaluation.value) {
		case "=": {
			value = `${Array.from(previousExpressionEvaluated.value).join(" ")} ${evaluation.value}`
			break
		}
		case "%": {
			if (!hasPreviousEntry.value) value = entry.value
			else value = `${previousEntry.value} ${operation.value} ${entry.value}`
			break
		}
		case "1/x": {
			value = `1/(${previousEntry.value})`
			break
		}
		case "x²": {
			value = `sqr(${previousEntry.value})`
			break
		}
		case "√": {
			value = `√(${previousEntry.value})`
			break
		}
	}

	return value
})
const hasSavedPreviousResult = computed(() => previousResult.value === entry.value)

const expressionAndPreviousResultInformation = reactive({
	hasSavedPreviousResult,
	operation,
	previousResult,
	rightEntry
})

function popOneDigit() {
	if (entry.value.length > 1) {
		const entryDigits = Array.from(entry.value)
		entryDigits.pop()
		entry.value = entryDigits.join("")
	} else entry.value = "0"
}
function clearEntryScreen() {
	if (hasSavedPreviousResult.value) clearAll(false)
	entry.value = ""
}
function clearAll(mustClearPreviousResult = true) {
	entry.value = ""
	previousEntry.value = 0
	operation.value = null
	evaluation.value = null
	if (mustClearPreviousResult) previousResult.value = "0"
}

function alterEntrySign() {
	if (Number(entry.value) !== 0) {
		const negatedEntry = Number(entry.value) * -1
		entry.value = String(negatedEntry)
	}
}
function appendDecimal() {
	if (entry.value.includes(".")) entry.value = entry.value.replace(".", "")
	entry.value += "."
}
function appendToEntryScreen(valueToAppend: Entries) {
	if (typeof valueToAppend === "number" && mustClearEntryOnNextAppend.value) clearEntryScreen()

	if (valueToAppend === ".") appendDecimal()
	else entry.value += valueToAppend

	mustClearEntryOnNextAppend.value = false
}

function setOperationValue(newOperation: Operations) {
	if (!operation.value) {
		if (!previousEntry.value) previousEntry.value = Number(entry.value)
		clearEntryScreen()
	} else if (!mustClearEntryOnNextAppend.value) {
		const expressionToEvaluateEagerly = `${previousEntry.value}${operation.value}${entry.value}`
		const result = String(evaluate(expressionToEvaluateEagerly))
		entry.value = result
		previousEntry.value = Number(result)
	} else if (hasSavedPreviousResult.value) {
		previousEntry.value = Number(previousResult.value)
		evaluation.value = null
		entry.value = ""
		expressionToEvaluate.value = ""
	}

	mustClearEntryOnNextAppend.value = true
	operation.value = newOperation
}

function evaluateExpression(evaluationMethod: Evaluations) {
	mustClearEntryOnNextAppend.value = true
	// function evaluateBasicOperation() {
	// 	if (hasSavedPreviousResult.value) {
	// 		rightEntry.value = Number(previousExpressionEvaluated.value[2])
	// 		expressionToEvaluate.value = `${previousResult.value}${operation.value}${rightEntry.value}`
	// 	}
	// 	previousResult.value = String(evaluate(expressionToEvaluate.value))
	// 	entry.value = previousResult.value
	// }

	switch (evaluationMethod) {
		// case "=": {
		// 	evaluateBasicOperation()
		// 	break
		// }
		case "%": {
			let percent = 0
			const base = Number(entry.value)

			if (operation.value) percent = previousEntry.value as number
			else percent = Number(previousResult.value)

			entry.value = solvePercentage(base, percent)
			break
		}
		case "1/x": {
			previousEntry.value = Number(entry.value)
			const quotient = 1 / previousEntry.value
			entry.value = String(quotient)
			break
		}
		case "x²": {
			previousEntry.value = Number(entry.value)
			const sqr = Number(entry.value) * Number(entry.value)
			entry.value = String(sqr)
			break
		}
		case "√": {
			previousEntry.value = Number(entry.value)
			const sqrt = Math.sqrt(Number(entry.value))
			entry.value = String(sqrt)
			break
		}
	}
}

function retrieveEvaluationResults(newEvaluation: Evaluations, result: number) {
	if (!previousExpressionEvaluated.value) previousExpressionEvaluated.value = expressionToEvaluate.value
	evaluation.value = newEvaluation
	previousResult.value = String(result)
	entry.value = String(result)
}
</script>

<template>
	<div class="calculator-container">
		<div class="screens">
			<div class="evaluation-screen-container">
				<ExpressionScreen
					class="screen"
					:value-to-display="expressionToDisplay"
				/>
			</div>
			<div class="entry-screen-container">
				<EntryScreen
					class="screen"
					:value-to-display="entry"
				/>
			</div>
		</div>
		<div class="common-buttons">
			<div class="row">
				<EvaluationButton value="%" @append-to-screen="retrieveEvaluationResults" />
				<CorrectionButton value="CE" @clear-entry-screen="clearEntryScreen" />
				<CorrectionButton value="C" @clear-all-screens="clearAll" />
				<CorrectionButton value="" @clear-one-digit="popOneDigit" />
			</div>
			<div class="row">
				<EvaluationButton value="1/x" @append-to-screen="retrieveEvaluationResults" />
				<EvaluationButton value="x²" @append-to-screen="retrieveEvaluationResults" />
				<EvaluationButton value="√" @append-to-screen="retrieveEvaluationResults" />
				<OperationalButton value="÷" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton :value="7" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="8" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="9" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="×" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton :value="4" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="5" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="6" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="-" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton :value="1" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="2" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="3" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="+" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton value="+/-" @alter-sign="alterEntrySign" />
				<DigitalButton :value="0" @append-to-screen="appendToEntryScreen" />
				<DigitalButton value="." @append-to-screen="appendToEntryScreen" />
				<EvaluationButton
					value="="
					:expression-to-evaluate="expressionToEvaluate"
					@emit-evaluation-result="retrieveEvaluationResults"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	button {
		@apply m-[1px] px-2 py-1;
		@apply border border-neutral-800 rounded-md;
		@apply text-xl text-neutral-800;
	}

	.common-buttons .row button {
		@apply flex flex-1 justify-center items-center;
	}
</style>

<style scoped lang="scss">
	.calculator-container {
		@apply p-1;
		@apply flex flex-col justify-between;
		min-height: 100vh;
	}

	.screens {
		position: relative;

		.evaluation-screen-container {
			@apply flex justify-end;
			position: absolute;
			top: 0;
			right: 0;
		}

		.entry-screen-container {
			@apply flex justify-end;

			@apply mb-2;
		}

		.entry-screen-container .screen {
			@apply text-4xl;
		}
	}

	.common-buttons {
		@apply flex flex-1 flex-col;

		.row {
			@apply flex flex-1;
		}
	}
</style>
