<script setup lang="ts">
import type { Entries } from "@/types/buttons"

interface Props {
	value: Entries
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "appendToScreen", valueToAppend: Entries): void
	(event: "alterSign"): void
}
const emit = defineEmits<CustomEvents>()

function appendToScreen() {
	if (props.value === "+/-") emit("alterSign")
	else emit("appendToScreen", props.value)
}
</script>

<template>
	<button class="digital-button" @click="appendToScreen">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>
