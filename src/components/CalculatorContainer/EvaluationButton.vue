<script setup lang="ts">
type Evaluations = "="|"√"|"x²"|"1/x"|"%"
interface Props {
	value: Evaluations
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "appendToScreen", valueToAppend: string): void
}
const emit = defineEmits<CustomEvents>()

function appendToScreen() {
	emit("appendToScreen", props.value)
}
</script>

<template>
	<button class="evaluation-button" @click="appendToScreen">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>