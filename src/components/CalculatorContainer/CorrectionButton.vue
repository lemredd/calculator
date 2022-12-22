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
const mayClearOneDigitOnly = computed(() => props.value === "")
const mayClearEntryScreenOnly = computed(() => props.value === "CE")

function clearScreens() {
	if (mayClearEntryScreenOnly.value) emit("clearEntryScreen")
	if (mayClearOneDigitOnly.value) emit("clearOneDigit")
	else emit("clearAllScreens")
}
</script>

<template>
	<button class="correction-button" @click="clearScreens">
		<span v-if="mayClearOneDigitOnly" class="material-symbols-outlined one-digit">
			backspace
		</span>
		<span v-else>
			{{ props.value }}
		</span>
	</button>
</template>


<style scoped lang="scss">
	@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
</style>
