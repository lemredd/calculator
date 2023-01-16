<script setup lang="ts">
import { computed, ref } from "vue"

import { HistoryItem, HistoryList } from "@/types/history"
import joinHistoryItemParts from "@/CalculatorContainer/HistoryContainer/helpers/joinHistoryItemParts"

import HistoryListItem from "@/CalculatorContainer/HistoryContainer/HistoryItem.vue"

interface Props {
	historyList: HistoryList
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "revertToChosenHistory", historyItem: HistoryItem): void
}
const emit = defineEmits<CustomEvents>()

const hasHistoryItems = computed(() => Boolean(props.historyList.length))
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
			<span class="header-text">History</span>
			<div v-if="hasHistoryItems" class="has-history-items">
				<HistoryListItem
					v-for="item in historyList"
					:key="joinHistoryItemParts(item)"
					:history-item="item"
					class="list-item"
					@click="revertToChosenHistory(item)"
				/>
			</div>

			<div v-else class="no-history-items">
				No history yet.
			</div>
		</ul>

		<Teleport to="#history-container-shown-by-default">
			<ul class="history-list shown-by-default">
				<span class="header-text">History</span>
				<!-- <div v-if="hasHistoryItems" class="has-history-items">
					<HistoryListItem
						v-for="item in historyList"
						:key="joinHistoryItemParts(item)"
						:history-item="item"
						class="list-item"
						@click="revertToChosenHistory(item)"
					/>
				</div>

				<div v-else class="no-history-items">
					No history yet.
				</div> -->
			</ul>
		</Teleport>
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

.header-text {
	@apply font-bold;
}

.history-list.hidden-by-default {
	@apply p-2;
	@apply rounded-t-md border border-black;
	@apply bg-white;

	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	z-index: 101;
}
</style>
