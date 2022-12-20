<script setup lang="ts">
import { ref } from "vue"

import Button from "@/CalculatorContainer/DigitalButton.vue"
import Screen from "@/CalculatorContainer/CalculatorScreen.vue"

const valueToDisplay = ref("0")
function appendToScreen(valueToAppend: number | string) {
	valueToDisplay.value += valueToAppend
}
</script>

<template>
	<Screen :value-to-display="valueToDisplay" />
	<Button :value="1" @append-to-screen="appendToScreen" />
</template>

<style scoped lang="scss">
</style>
