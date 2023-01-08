<script setup lang="ts">
import { ref } from "vue"

import { Operations } from "@/types/buttons"

interface HistoryItem {
	leftOperand: number
	operation: Operations
	rightOperand: number
}
interface Props {
	historyList: HistoryItem[]
}
defineProps<Props>()

interface CustomEvents {
	(event: "revertToChosenHistory", historyItem: HistoryItem): void
}
const emit = defineEmits<CustomEvents>()

const isShowingHistoryList = ref(false)
function toggleHistoryList() {
	isShowingHistoryList.value = !isShowingHistoryList.value
}

function joinHistoryItemParts(historyItem: HistoryItem) {
	return `${historyItem.leftOperand} ${historyItem.operation} ${ historyItem.rightOperand}`
}

function revertToChosenHistory(historyItem: HistoryItem) {
	emit("revertToChosenHistory", historyItem)
}
</script>

<template>
	<div class="history-container">
		<button
			class="material-symbols-outlined show-history-btn"
			@click="toggleHistoryList"
		>
			history
		</button>

		<ul
			v-if="isShowingHistoryList"
			class="history-list hidden-by-default"
		>
			<li
				v-for="item in historyList"
				:key="joinHistoryItemParts(item)"
				class="history-item"
				@click="revertToChosenHistory(item)"
			>
				{{ joinHistoryItemParts(item) }} =
			</li>
		</ul>

		<ul class="history-list shown-by-default">
			<div class="history-item" />
		</ul>
	</div>
</template>

<style scoped lang="scss">
	@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
</style>
