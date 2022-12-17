<script setup lang="ts">
import { ref } from "vue"

import Button from "@/CalculatorContainer/CalculatorButton.vue"
import Screen from "@/CalculatorContainer/CalculatorScreen.vue"

const valueToDisplay = ref("0")
</script>

<template>
	<Screen :value-to-display="valueToDisplay" />
	<Button :value="1" />
</template>

<style scoped lang="scss">
</style>
