<script setup lang="ts">
import type { Corrections } from "@/types/buttons"

interface Props {
	value: Corrections
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "appendToScreen", valueToAppend: Corrections): void
}
const emit = defineEmits<CustomEvents>()

function appendToScreen() {
	emit("appendToScreen", props.value)
}
</script>

<template>
	<button class="correction-button" @click="appendToScreen">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>
