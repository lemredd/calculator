<script setup lang="ts">
import type { HistoryItem } from "@/types/history"

import evaluate from "@/CalculatorContainer/helpers/evaluate"
import joinHistoryItemParts from "@/CalculatorContainer/HistoryContainer/helpers/joinHistoryItemParts"

interface Props {
	historyItem: HistoryItem
}
const props = defineProps<Props>()

const result = evaluate(joinHistoryItemParts(props.historyItem))
</script>

<template>
	<li class="history-item">
		<h3 class="expression">
			{{ joinHistoryItemParts(historyItem) }} =
		</h3>
		<h1 class="result">
			{{ result }}
		</h1>
	</li>
</template>

<style scoped lang="scss">
.history-item {
	@apply w-max ml-auto;

	.expression {
	@apply text-sm;
}

	.result {
		@apply text-2xl;
		@apply w-max ml-auto;
	}
}
</style>
