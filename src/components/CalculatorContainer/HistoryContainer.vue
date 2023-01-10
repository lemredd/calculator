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
	toggleHistoryList()
}
</script>

<template>
	<div class="history-container">
		<button
			class="material-symbols-outlined show-history-btn no-border"
			@click="toggleHistoryList"
		>
			history
		</button>

		<div
			v-if="isShowingHistoryList"
			class="overlay"
			@click="toggleHistoryList"
		/>

		<ul
			v-if="isShowingHistoryList"
			class="history-list hidden-by-default"
		>
			<div class="history-list-header">
				<span class="header-text">History</span>
				<button
					class="material-symbols-outlined close-btn no-border"
					@click="toggleHistoryList"
				>
					close
				</button>
			</div>
			<HistoryListItem
				v-for="item in historyList"
				:key="joinHistoryItemParts(item)"
				:history-item="item"
				class="list-item"
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

.show-history-btn {
	z-index: 999;
	position: fixed;
}

.overlay {
	@apply bg-neutral-900/50;
	content: "";
	position: fixed;
	inset: 0;

	z-index: 100;
}

.history-list {
	.history-list-header {
		@apply flex items-center justify-between;
	}
}

.history-list.hidden-by-default {
	@apply p-4;
	@apply rounded-t-sm;
	@apply bg-white;

	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	z-index: 101;
}
</style>
