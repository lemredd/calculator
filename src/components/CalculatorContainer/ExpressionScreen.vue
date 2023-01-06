<script setup lang="ts">
import { computed } from "vue"

import { Evaluations, Operations } from "@/types/buttons"

interface Props {
	entry: string
	evaluation: Evaluations|null
	hasPreviousEntry: boolean
	operation: Operations|null
	previousEntry: number|null
	previousExpressionEvaluated: string
}
const props = defineProps<Props>()

const expressionToDisplay = computed(() => {
	let value = props.hasPreviousEntry ? `${props.previousEntry} ${props.operation}` : ""

	switch(props.evaluation) {
		case "=": {
			const [ LeftOperand, rightOperand ] = props.previousExpressionEvaluated.split(props.operation as Operations)
			const spacedExpression = `${LeftOperand} ${props.operation} ${rightOperand}`
			value = `${spacedExpression} ${props.evaluation}`
			break
		}
		case "%": {
			if (!props.hasPreviousEntry) value = props.entry
			else value = `${props.previousEntry} ${props.operation} ${props.entry}`
			break
		}
		case "1/x": {
			value = `1/(${props.previousEntry})`
			break
		}
		case "x²": {
			value = `sqr(${props.previousEntry})`
			break
		}
		case "√": {
			value = `√(${props.previousEntry})`
			break
		}
	}

	return value
})

const expressionScreenClasses = computed(() => ({
	"empty": expressionToDisplay.value === ""
}))
</script>

<template>
	<span class="expression-screen" :class="expressionScreenClasses">
		{{ expressionToDisplay }}
	</span>
</template>

<style scoped lang="scss">
.expression-screen.empty {
	@apply h-6;
}
</style>
