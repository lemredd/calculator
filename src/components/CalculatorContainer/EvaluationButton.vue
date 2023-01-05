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
	switch(props.value) {
		case "=": {
			emit("emitEvaluationResult", props.value, Number(evaluate(props.expressionToEvaluate)))
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
