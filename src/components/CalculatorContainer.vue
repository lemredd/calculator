<script setup lang="ts">
import { computed, ref } from "vue"

import type { PossibleButtonValues } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import EntryScreen from "@/CalculatorContainer/EntryScreen.vue"
import DigitalButton from "@/CalculatorContainer/DigitalButton.vue"
import EvaluationScreen from "@/CalculatorContainer/EvaluationScreen.vue"
import EvaluationButton from "@/CalculatorContainer/EvaluationButton.vue"
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
const evaluatedValue = ref("0")
function evaluateExpression(valueToAppend: PossibleButtonValues) {
	evaluatedValue.value = evaluate(`${evaluationValue.value} ${entryValue.value}`)

	appendToEvaluationScreen(valueToAppend)
	entryValue.value = String(evaluatedValue.value)
}
</script>

<template>
	<div class="screens">
		<EvaluationScreen :value-to-display="evaluationValue" />
		<EntryScreen :value-to-display="entryValue" />
	</div>
	<DigitalButton :value="1" @append-to-screen="appendToEntryScreen" />
	<OperationalButton value="+" @append-to-screen="appendToEvaluationScreen" />
	<EvaluationButton value="=" @append-to-screen="evaluateExpression" />
</template>

<style scoped lang="scss">
</style>
