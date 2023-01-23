<script setup lang="ts">
import { computed, reactive, ref } from "vue"

import type { HistoryItem, HistoryList } from "@/types/history"
import type {
	Entries,
	Operations,
	Evaluations
} from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

import EntryScreen from "@/CalculatorContainer/EntryScreen.vue"
import DigitalButton from "@/CalculatorContainer/DigitalButton.vue"
import ExpressionScreen from "@/CalculatorContainer/ExpressionScreen.vue"
import EvaluationButton from "@/CalculatorContainer/EvaluationButton.vue"
import CorrectionButton from "@/CalculatorContainer/CorrectionButton.vue"
import HistoryContainer from "@/CalculatorContainer/HistoryContainer.vue"
import OperationalButton from "@/CalculatorContainer/OperationalButton.vue"

const entry = ref("")
const mustClearEntryOnNextAppend = ref(false)
const previousEntry = ref<number|null>(null)
const operation = ref<Operations|null>(null)
const previousResult = ref("0")
const previousExpressionEvaluated = ref("")
const evaluation = ref<Evaluations|null>(null)
const lastPassedEntry = ref<number|null>(null)
const historyList = ref<HistoryList>([])

const hasPreviousEntry = computed(() => previousEntry.value !== null && Boolean(operation.value))
const expressionToEvaluate = computed({
	get() {
		let value = ""

		if (previousEntry.value) value += previousEntry.value
		if (operation.value) value += operation.value

		if (!entry.value) value += previousEntry.value
		else if (hasPreviousEntry.value && entry.value) value  += entry.value

		return value
	}, set(newValue: string) {
		previousExpressionEvaluated.value = newValue
	}
})
const hasSavedPreviousResult = computed(() => previousResult.value === entry.value && mustClearEntryOnNextAppend.value)

const expressionAndPreviousResultInformation = reactive({
	hasSavedPreviousResult,
	operation,
	previousEntry,
	previousResult,
	rightEntry: lastPassedEntry
})

function popOneDigit() {
	if (entry.value.length > 1) {
		const entryDigits = Array.from(entry.value)
		entryDigits.pop()
		entry.value = entryDigits.join("")
	} else entry.value = "0"
}
function clearEntryScreen() {
	if (hasSavedPreviousResult.value) clearAll(false)
	entry.value = ""
}
function clearAll(mustClearPreviousResult = true) {
	entry.value = ""
	previousEntry.value = null
	operation.value = null
	evaluation.value = null
	if (mustClearPreviousResult) {
		previousResult.value = "0"
		previousExpressionEvaluated.value = ""
	}
}

function alterEntrySign() {
	if (Number(entry.value) !== 0) {
		const negatedEntry = Number(entry.value) * -1
		entry.value = String(negatedEntry)
	}
}
function appendDecimal() {
	if (entry.value.includes(".")) entry.value = entry.value.replace(".", "")
	entry.value += "."
}
function appendToEntryScreen(valueToAppend: Entries) {
	if (typeof valueToAppend === "number" && mustClearEntryOnNextAppend.value) clearEntryScreen()

	if (valueToAppend === ".") appendDecimal()
	else entry.value += valueToAppend

	mustClearEntryOnNextAppend.value = false
}

function setOperationValue(newOperation: Operations) {
	if (!operation.value) {
		if (previousEntry.value === null) previousEntry.value = Number(entry.value)
		clearEntryScreen()
	} else if (!mustClearEntryOnNextAppend.value) {
		const expressionToEvaluateEagerly = `${previousEntry.value}${operation.value}${entry.value}`
		const result = String(evaluate(expressionToEvaluateEagerly))
		entry.value = result
		previousEntry.value = Number(result)
	} else if (hasSavedPreviousResult.value) {
		previousEntry.value = Number(previousResult.value)
		evaluation.value = null
		entry.value = ""
		expressionToEvaluate.value = ""
	}

	mustClearEntryOnNextAppend.value = true
	operation.value = newOperation
}

function addToHistoryList() {
	const [
		leftOperand,
		rightOperand
	] = previousExpressionEvaluated.value.split(operation.value as Operations)
	const historyItem = {
		"leftOperand": Number(leftOperand),
		"operation": operation.value as Operations,
		"rightOperand": Number(rightOperand)
	}

	historyList.value.push(historyItem)
}

function retrieveEvaluationResults(newEvaluation: Evaluations, result: number) {
	mustClearEntryOnNextAppend.value = true
	const mustSaveCurrentEntry = newEvaluation !== "="

	previousExpressionEvaluated.value = expressionToEvaluate.value
	if (!lastPassedEntry.value) {
		const [ leftOperand, unusedRightOperand ] = previousExpressionEvaluated.value.split(operation.value as Operations)
		lastPassedEntry.value = Number(leftOperand)
	}
	if (hasSavedPreviousResult.value) expressionToEvaluate.value = `${previousResult.value}${operation.value}${lastPassedEntry.value}`
	if (mustSaveCurrentEntry && newEvaluation !== "%") previousEntry.value = Number(entry.value)

	evaluation.value = newEvaluation
	previousResult.value = String(result)

	entry.value = String(result)
	if (!mustSaveCurrentEntry) addToHistoryList()
}

function revertToChosenHistory(historyItem: HistoryItem) {
	const { leftOperand, "operation": operationFromHistory, rightOperand } = historyItem
	evaluation.value = "="
	previousExpressionEvaluated.value = `${leftOperand}${operationFromHistory}${rightOperand}`
	entry.value = String(evaluate(previousExpressionEvaluated.value))
}
</script>

<template>
	<div class="calculator-container">
		<HistoryContainer
			:history-list="historyList"
			@revert-to-chosen-history="revertToChosenHistory"
		/>
		<div class="screens">
			<div class="evaluation-screen-container">
				<ExpressionScreen
					class="screen"
					:entry="entry"
					:evaluation="evaluation"
					:has-previous-entry="hasPreviousEntry"
					:operation="operation"
					:previous-entry="previousEntry"
					:previous-expression-evaluated="previousExpressionEvaluated"
				/>
			</div>
			<div class="entry-screen-container">
				<EntryScreen
					class="screen"
					:value-to-display="entry"
				/>
			</div>
		</div>
		<div class="common-buttons">
			<div class="row">
				<EvaluationButton
					value="%"
					:entry="entry"
					:expression-to-evaluate="expressionToEvaluate"
					:expression-and-previous-result-information="expressionAndPreviousResultInformation"
					@emit-evaluation-result="retrieveEvaluationResults"
				/>
				<CorrectionButton value="CE" @clear-entry-screen="clearEntryScreen" />
				<CorrectionButton value="C" @clear-all-screens="clearAll" />
				<CorrectionButton value="" @clear-one-digit="popOneDigit" />
			</div>
			<div class="row">
				<EvaluationButton
					value="1/x"
					:entry="entry"
					:expression-to-evaluate="expressionToEvaluate"
					:expression-and-previous-result-information="expressionAndPreviousResultInformation"
					@emit-evaluation-result="retrieveEvaluationResults"
				/>
				<EvaluationButton
					value="x²"
					:entry="entry"
					:expression-to-evaluate="expressionToEvaluate"
					:expression-and-previous-result-information="expressionAndPreviousResultInformation"
					@emit-evaluation-result="retrieveEvaluationResults"
				/>
				<EvaluationButton
					value="√"
					:entry="entry"
					:expression-to-evaluate="expressionToEvaluate"
					:expression-and-previous-result-information="expressionAndPreviousResultInformation"
					@emit-evaluation-result="retrieveEvaluationResults"
				/>
				<OperationalButton value="÷" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton :value="7" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="8" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="9" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="×" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton :value="4" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="5" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="6" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="-" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton :value="1" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="2" @append-to-screen="appendToEntryScreen" />
				<DigitalButton :value="3" @append-to-screen="appendToEntryScreen" />
				<OperationalButton value="+" @append-to-screen="setOperationValue" />
			</div>
			<div class="row">
				<DigitalButton value="+/-" @alter-sign="alterEntrySign" />
				<DigitalButton :value="0" @append-to-screen="appendToEntryScreen" />
				<DigitalButton value="." @append-to-screen="appendToEntryScreen" />
				<EvaluationButton
					value="="
					:expression-to-evaluate="expressionToEvaluate"
					:expression-and-previous-result-information="expressionAndPreviousResultInformation"
					@emit-evaluation-result="retrieveEvaluationResults"
				/>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.common-buttons .row button {
	@apply flex flex-1 justify-center items-center;
}
</style>

<style scoped lang="scss">
.calculator-container {
	@apply p-1;
	@apply flex flex-col justify-between;
	height: 100%;
}

.screens {
	@apply mb-2 px-2 pt-2;
	@apply border border-black rounded-md;
	@apply bg-calculator-mustard;

	.evaluation-screen-container {
		@apply flex justify-end;
	}

	.entry-screen-container {
		@apply flex justify-end;
		@apply mt-2 mb-4;
	}

	.entry-screen-container .screen {
		@apply text-4xl;
	}
}

.common-buttons {
	@apply flex flex-1 flex-col;

	.row {
		@apply flex flex-1;
	}
}
</style>
