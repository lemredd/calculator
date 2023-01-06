<script setup lang="ts">
import { computed } from "vue"

interface Props {
	valueToDisplay: string
}
const props = defineProps<Props>()

const expressionScreenClasses = computed(() => ({
	"empty": props.valueToDisplay === ""
}))
</script>

<template>
	<span class="expression-screen" :class="expressionScreenClasses">
		{{ valueToDisplay }}
	</span>
</template>

<style scoped lang="scss">
.expression-screen.empty {
	@apply h-8;
}
</style>
