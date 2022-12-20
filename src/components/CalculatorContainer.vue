<script setup lang="ts">
import { computed, ref } from "vue"

import type { PossibleButtonValues } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import Screen from "@/CalculatorContainer/EvaluationScreen.vue"
import DigitalButton from "@/CalculatorContainer/DigitalButton.vue"
import EvaluationButton from "@/CalculatorContainer/EvaluationButton.vue"
import OperationalButton from "@/CalculatorContainer/OperationalButton.vue"

const valueToDisplay = ref("0")
const isDisplayEmpty = computed(() => valueToDisplay.value === "0")

function appendToScreen(valueToAppend: PossibleButtonValues) {
	if (isDisplayEmpty.value) valueToDisplay.value = String(valueToAppend)
	else valueToDisplay.value += ` ${valueToAppend}`
}

function evaluateExpression(valueToAppend: PossibleButtonValues) {
	const evaluatedValue = evaluate(valueToDisplay.value)

	appendToScreen(valueToAppend)
	return evaluatedValue
}
</script>

<template>
	<Screen :value-to-display="valueToDisplay" />
	<DigitalButton :value="1" @append-to-screen="appendToScreen" />
	<OperationalButton value="+" @append-to-screen="appendToScreen" />
	<EvaluationButton value="=" @append-to-screen="evaluateExpression" />
</template>

<style scoped lang="scss">
</style>
