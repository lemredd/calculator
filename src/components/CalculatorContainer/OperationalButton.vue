<script setup lang="ts">
import type { Operations } from "@/types/buttons"
interface Props {
	value: Operations
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
	<button class="operational-button" @click="appendToScreen">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>
