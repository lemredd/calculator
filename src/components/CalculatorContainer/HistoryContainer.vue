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
	(event: "clearHistory"): void
	(event: "revertToChosenHistory", historyItem: HistoryItem): void
}
const emit = defineEmits<CustomEvents>()

const reversedHistoryList = computed(() => {
	return [...props.historyList].reverse()
})
const hasHistoryItems = computed(() => Boolean(props.historyList.length))
const isShowingHistoryList = ref(false)
function toggleHistoryList() {
	isShowingHistoryList.value = !isShowingHistoryList.value
}

function revertToChosenHistory(historyItem: HistoryItem) {
	emit("revertToChosenHistory", historyItem)
	isShowingHistoryList.value = false
}

function clearHistory() {
	emit("clearHistory")
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
			<div class="history-header">
				<span class="header-text">History</span>
				<button
					v-if="hasHistoryItems"
					class="clear-history-btn material-symbols-outlined no-border"
					@click="clearHistory"
				>
					delete
				</button>
			</div>
			<div v-if="hasHistoryItems" class="has-history-items">
				<HistoryListItem
					v-for="item in reversedHistoryList"
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
				<div class="history-list-wrapper">
					<div class="history-header">
						<span class="header-text">History</span>
						<button
							v-if="hasHistoryItems"
							class="clear-history-btn material-symbols-outlined no-border"
							@click="clearHistory"
						>
							delete
						</button>
					</div>
					<div v-if="hasHistoryItems" class="has-history-items">
						<HistoryListItem
							v-for="item in reversedHistoryList"
							:key="joinHistoryItemParts(item)"
							:history-item="item"
							class="list-item"
							@click="revertToChosenHistory(item)"
						/>
					</div>

					<div v-else class="no-history-items">
						No history yet.
					</div>
				</div>
			</ul>
		</Teleport>
	</div>
</template>

<style scoped lang="scss">
@import "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";

.history-container {
	position: relative;

	.show-history-btn {
		z-index: 999;
		position: absolute;
		top: .25em;
		left: .25em;
	}
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

.history-list {
	&.hidden-by-default {
		@apply p-2;
		@apply rounded-t-md border border-calculator-ocean;
		@apply bg-white;

		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		z-index: 101;
	}

	&.shown-by-default {
		@apply p-4;
		height: 100%;
		max-height: 100vh;

		.history-list-wrapper {
			@apply border-2 border-calculator-ocean;
			@apply p-4;
			@apply bg-white;
			height: 100%;
			max-height: 100vh;
			overflow-y: scroll;
			scrollbar-width: none;
		}

		.history-list-wrapper::-webkit-scrollbar {
			width: .5em;
		}

		.history-list-wrapper::-webkit-scrollbar-thumb {
			@apply bg-slate-400;
			@apply rounded-md;
			width: .5em;
		}
		.history-list-wrapper::-webkit-scrollbar-thumb:hover {
			@apply bg-slate-500;
		}

		.header-text {
			@apply block mb-2;
			@apply text-xl;
		}
	}

	.history-header {
		@apply mb-4;
		@apply flex items-center justify-between;
	}
}


@screen md {
	.show-history-btn {
		display: none;
	}
}
</style>
