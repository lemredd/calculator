<script setup lang="ts">
import { ref } from "vue"

import { HistoryItem, HistoryList } from "@/types/history"
import joinHistoryItemParts from "@/CalculatorContainer/HistoryContainer/helpers/joinHistoryItemParts"

import HistoryListItem from "@/CalculatorContainer/HistoryContainer/HistoryItem.vue"

interface Props {
	historyList: HistoryList
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
			<HistoryListItem
				v-for="item in historyList"
				:key="joinHistoryItemParts(item)"
				:history-item="item"
				@click="revertToChosenHistory(item)"
			/>
		</ul>

		<ul class="history-list shown-by-default">
			<div class="history-item" />
		</ul>
	</div>
</template>

<style scoped lang="scss">
	@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
</style>
