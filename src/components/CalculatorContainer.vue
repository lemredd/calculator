<script setup lang="ts">
import { computed, ref } from "vue"

import type {
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

const entry = ref("0")
const leftEntry = ref<number|null>(null)
const operation = ref<Operations|null>(null)
const rightEntry = ref<number|null>(null)
const mustResetOnNextEntry = ref(false)
const previousResult = ref("0")
const evaluation = ref<Evaluations|null>(null)

const isEntryValueEmpty = computed(() => entry.value === "0")
const mayPassToRightEntry = computed(() => Boolean(leftEntry.value) && Boolean(operation.value))
const expressionToEvaluate = computed(() => {
	let value = ""

	if (leftEntry.value) value += leftEntry.value
	if (operation.value) value += operation.value
	if (rightEntry.value) value += rightEntry.value

	return value
})
const expressionToDisplay = computed(() => {
	let value = Array.from(expressionToEvaluate.value).join(" ")


	return value
})

function appendToEntryScreen(valueToAppend: string|number) {
	if (isEntryValueEmpty.value || mustResetOnNextEntry.value) entry.value = String(valueToAppend)
	else entry.value += String(valueToAppend)

	mustResetOnNextEntry.value = false
}
function popOneDigit() {
	const entryDigits = Array.from(entry.value)
	entryDigits.pop()
	entry.value = entryDigits.join("")
}

function setOperationValue(newOperation: Operations) {
	if (!leftEntry.value) {
		leftEntry.value = Number(entry.value)
	}
	if (mayPassToRightEntry.value) rightEntry.value = Number(entry.value)
	mustResetOnNextEntry.value = true

	const mayEvaluate = leftEntry.value && rightEntry.value
	const expressionToEvaluate = `${leftEntry.value}${operation.value}${rightEntry.value}`

	if (mayEvaluate) String(evaluate(expressionToEvaluate))
	operation.value = newOperation
}

const hasEvaluatedResult = computed(() => previousResult.value === entry.value)
const isEvaluatingBasicOperation = computed(() => evaluation.value === "=")

function evaluateExpression(evaluationMethod: Evaluations) {
	function evaluateBasicOperation() {
		if (hasEvaluatedResult.value) leftEntry.value = Number(previousResult.value)
		previousResult.value = String(evaluate(expressionToEvaluate.value))
		entry.value = previousResult.value
	}

	switch (evaluationMethod) {
		case "=": {
			evaluateBasicOperation()
			break
		}
		case "%": {
			const base = entry.value
			const percent = Number(previousResult.value) / 100
			const percentageResult = String(evaluate(`${base} * ${percent}`))
			entry.value = percentageResult
			// expressionValue.value = percentageResult
			break
		}
		case "1/x": {
			const quotient = 1 / Number(entry.value)
			entry.value = String(quotient)
			break
		}
		case "x²": {
			const sqr = Number(entry.value) * Number(entry.value)
			entry.value = String(sqr)
			break
		}
		case "√": {
			const sqrt = Math.sqrt(Number(entry.value))
			entry.value = String(sqrt)
			break
		}
	}
}

function setEvaluationValue(newEvaluation: Evaluations) {
	if (
		mayPassToRightEntry.value &&
		!hasEvaluatedResult.value
	) rightEntry.value = Number(entry.value)
	mustResetOnNextEntry.value = true

	evaluateExpression(newEvaluation)
	evaluation.value = newEvaluation
}

function clearEntryScreen() {
	entry.value = "0"
}
function clearAll() {
	entry.value = "0"
	leftEntry.value = null
	rightEntry.value = null
	operation.value = null
	previousResult.value = "0"
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
			<EntryScreen
				class="screen"
				:value-to-display="entry"
			/>
		</div>
		<div class="common-buttons">
			<div class="row">
				<EvaluationButton value="%" @append-to-screen="setEvaluationValue" />
				<CorrectionButton value="CE" @clear-entry-screen="clearEntryScreen" />
				<CorrectionButton value="C" @clear-all-screens="clearAll" />
				<CorrectionButton value="" @clear-one-digit="popOneDigit" />
			</div>
			<div class="row">
				<EvaluationButton value="1/x" @append-to-screen="setEvaluationValue" />
				<EvaluationButton value="x²" @append-to-screen="setEvaluationValue" />
				<EvaluationButton value="√" @append-to-screen="setEvaluationValue" />
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
				<DigitalButton value="+/-" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="0" @append-to-screen="appendToEntryScreen" />
				<DigitalButton value="." @append-to-screen="appendToEntryScreen" />
				<EvaluationButton value="=" @append-to-screen="setEvaluationValue" />
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	.entry-screen {
		@apply text-4xl;

		direction: rtl;
		width: 100%;
	}

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

		.screen:nth-child(2) {
			@apply mt-8 mb-2;
		}
	}

	.common-buttons {
		@apply flex flex-1 flex-col;

		.row {
			@apply flex flex-1;
		}
	}
</style>
