<script setup lang="ts">
import type { Evaluations } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

type ExpressionAndPreviousResultInformation = {
	hasSavedPreviousResult: boolean
	previousResult: string
	operation: string|null
	rightEntry: number|null
}
interface Props {
	expressionToEvaluate: string,
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

	switch(props.value) {
		case "=": {
			emit("emitEvaluationResult", props.value, evaluateWithEquals())
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
