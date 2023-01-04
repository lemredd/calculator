<script setup lang="ts">
import type { Evaluations } from "@/types/buttons"

import evaluate from "@/CalculatorContainer/helpers/evaluate"

interface Props {
	expressionToEvaluate: string
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
