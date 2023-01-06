<script setup lang="ts">
import type { Evaluations, Operations } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"
import solvePercentage from "@/CalculatorContainer/helpers/solvePercentage"

type ExpressionAndPreviousResultInformation = {
	hasSavedPreviousResult: boolean
	previousEntry: number|null
	previousResult: string
	operation: Operations|null
	rightEntry: number|null
}
interface Props {
	entry?: string
	expressionToEvaluate: string
	expressionAndPreviousResultInformation: ExpressionAndPreviousResultInformation
	value: Evaluations
}
const props = defineProps<Props>()

interface CustomEvents {
	(event: "emitEvaluationResult", valueToAppend: Evaluations, evaluationResult: number): void
}
const emit = defineEmits<CustomEvents>()

function evaluateExpression() {
	function evaluateWithEquals() {
		let { expressionToEvaluate } = props
		const {
			hasSavedPreviousResult,
			previousResult,
			operation,
			rightEntry
		} = props.expressionAndPreviousResultInformation

		if (hasSavedPreviousResult) expressionToEvaluate = `${previousResult}${operation}${rightEntry}`

		return Number(evaluate(expressionToEvaluate))
	}

	function evaluateWithPercent() {
		let percent = 0
		const { entry } = props
		const {
			operation,
			previousEntry,
			previousResult
		} = props.expressionAndPreviousResultInformation
		const base = Number(entry)

		if (operation && previousEntry !== null) percent = previousEntry as number
		else percent = Number(previousResult)

		return Number(solvePercentage(base, percent))
	}

	switch(props.value) {
		case "=": {
			emit("emitEvaluationResult", props.value, evaluateWithEquals())
			break
		}
		case "%": {
			emit("emitEvaluationResult", props.value, evaluateWithPercent())
			break
		}
	}
}
</script>

<template>
	<button class="evaluation-button" @click="evaluateExpression">
		{{ props.value }}
	</button>
</template>

<style scoped lang="scss">
</style>
