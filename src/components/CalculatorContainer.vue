<script setup lang="ts">
import { computed, ref } from "vue"

import type { PossibleButtonValues } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import EntryScreen from "@/CalculatorContainer/EntryScreen.vue"
import DigitalButton from "@/CalculatorContainer/DigitalButton.vue"
import EvaluationScreen from "@/CalculatorContainer/EvaluationScreen.vue"
import EvaluationButton from "@/CalculatorContainer/EvaluationButton.vue"
import CorrectionButton from "@/CalculatorContainer/CorrectionButton.vue"
import OperationalButton from "@/CalculatorContainer/OperationalButton.vue"

// EntryScreen data and mutators
const entryValue = ref("0")
const mustResetOnNextEntry = ref(false)
const isEntryValueEmpty = computed(() => entryValue.value === "0")

function appendToEntryScreen(valueToAppend: string|number) {
	if (isEntryValueEmpty.value || mustResetOnNextEntry.value) entryValue.value = String(valueToAppend)
	else entryValue.value += String(valueToAppend)

	mustResetOnNextEntry.value = false
}

// EvaluationScreen data and mutators
const evaluationValue = ref("")
const isEvaluationValueEmpty = computed(() => evaluationValue.value === "")

function appendToEvaluationScreen(valueToAppend: PossibleButtonValues) {
	mustResetOnNextEntry.value = true

	if (!isEvaluationValueEmpty.value) evaluationValue.value += ` ${entryValue.value} ${valueToAppend}`
	else evaluationValue.value = `${entryValue.value} ${valueToAppend}`
}

// Evaluated data and mutators
const previousEvaluatedValue = ref("0")
function evaluateExpression(evaluationMethod: PossibleButtonValues) {
	switch (evaluationMethod) {
		case "=": {
			previousEvaluatedValue.value = String(evaluate(`${evaluationValue.value} ${entryValue.value}`))
			appendToEvaluationScreen(evaluationMethod)
			entryValue.value = previousEvaluatedValue.value
			break
		}
		case "%": {
			const base = entryValue.value
			const percent = Number(previousEvaluatedValue.value) / 100
			const percentageResult = String(evaluate(`${base} * ${percent}`))
			entryValue.value = percentageResult
			evaluationValue.value = percentageResult
			break
		}
		case "1/x": {
			const quotient = 1 / Number(entryValue.value)
			evaluationValue.value = `1/(${entryValue.value})`
			entryValue.value = String(quotient)
			break
		}
		case "x²": {
			const sqr = Number(entryValue.value) * Number(entryValue.value)
			evaluationValue.value = `sqr(${entryValue.value})`
			entryValue.value = String(sqr)
			break
		}
		case "√": {
			const sqrt = Math.sqrt(Number(entryValue.value))
			evaluationValue.value = `√(${entryValue.value})`
			entryValue.value = String(sqrt)
			break
		}
	}

	mustResetOnNextEntry.value = true
}
</script>

<template>
	<div class="calculator-container">
		<div class="screens">
			<div class="evaluation-screen-container">
				<EvaluationScreen
					class="screen"
					:value-to-display="evaluationValue"
				/>
			</div>
			<EntryScreen
				class="screen"
				:value-to-display="entryValue"
			/>
		</div>
		<div class="common-buttons">
			<div class="row">
				<EvaluationButton value="%" @append-to-screen="evaluateExpression" />
				<CorrectionButton value="CE" @append-to-screen="evaluateExpression" />
				<CorrectionButton value="C" @append-to-screen="evaluateExpression" />
				<CorrectionButton value="" @append-to-screen="evaluateExpression" />
			</div>
			<div class="row">
				<EvaluationButton value="1/x" @append-to-screen="evaluateExpression" />
				<EvaluationButton value="x²" @append-to-screen="evaluateExpression" />
				<EvaluationButton value="√" @append-to-screen="evaluateExpression" />
				<OperationalButton value="÷" @append-to-screen="appendToEvaluationScreen" />
			</div>
			<div class="row">
				<DigitalButton :value="7" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="8" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="9" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="×" @append-to-screen="appendToEvaluationScreen" />
			</div>
			<div class="row">
				<DigitalButton :value="4" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="5" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="6" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="-" @append-to-screen="appendToEvaluationScreen" />
			</div>
			<div class="row">
				<DigitalButton :value="1" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="2" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="3" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="+" @append-to-screen="appendToEvaluationScreen" />
			</div>
			<div class="row">
				<DigitalButton value="+/-" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="0" @append-to-screen="appendToEntryScreen" />
				<DigitalButton value="." @append-to-screen="appendToEntryScreen" />
				<EvaluationButton value="=" @append-to-screen="evaluateExpression" />
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
