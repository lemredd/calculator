<script setup lang="ts">
import { computed } from "vue"
import type { Corrections } from "@/types/buttons"

interface Props {
	value: Corrections
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "clearOneDigit"): void
	(event: "clearAllScreens"): void
	(event: "clearEntryScreen"): void
}
const emit = defineEmits<CustomEvents>()
const mayOneDigitOnly = computed(() => props.value === "")
const mayClearEntryScreenOnly = computed(() => props.value === "CE")

function clearScreens() {
	if (mayClearEntryScreenOnly.value) emit("clearEntryScreen")
	if (mayOneDigitOnly.value) emit("clearOneDigit")
	else emit("clearAllScreens")
}
</script>

<template>
	<button class="correction-button" @click="clearScreens">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>
