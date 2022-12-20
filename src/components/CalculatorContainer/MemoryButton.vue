<script setup lang="ts">
import type { MemoryOperations } from "@/types/buttons"

interface Props {
	value: MemoryOperations
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "appendToScreen", valueToAppend: MemoryOperations): void
}
const emit = defineEmits<CustomEvents>()

function appendToScreen() {
	emit("appendToScreen", props.value)
}
</script>

<template>
	<button class="memory-button" @click="appendToScreen">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>
