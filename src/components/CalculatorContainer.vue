<script setup lang="ts">
import { computed, ref } from "vue"

import Screen from "@/CalculatorContainer/CalculatorScreen.vue"
import DigitalButton from "@/CalculatorContainer/DigitalButton.vue"
import EvaluationButton from "@/CalculatorContainer/EvaluationButton.vue"
import OperationalButton from "@/CalculatorContainer/OperationalButton.vue"

const valueToDisplay = ref("0")
const isDisplayEmpty = computed(() => valueToDisplay.value === "0")
function appendToScreen(valueToAppend: number | string) {
	if (isDisplayEmpty.value) valueToDisplay.value = String(valueToAppend)
	else valueToDisplay.value += ` ${valueToAppend}`
}
</script>

<template>
	<Screen :value-to-display="valueToDisplay" />
	<DigitalButton :value="1" @append-to-screen="appendToScreen" />
	<OperationalButton value="+" @append-to-screen="appendToScreen" />
	<EvaluationButton value="=" @append-to-screen="appendToScreen" />
</template>

<style scoped lang="scss">
</style>
