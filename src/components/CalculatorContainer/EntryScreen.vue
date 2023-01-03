<script setup lang="ts">
import { computed } from "vue"

interface Props {
	valueToDisplay: string
}
const props = defineProps<Props>()

const entryScreenClasses = computed(() => ({
	"empty": props.valueToDisplay === ""
}))
</script>

<template>
	<span class="entry-screen" :class="entryScreenClasses">
		{{ valueToDisplay }}
	</span>
</template>

<style scoped lang="scss">
.entry-screen.empty {
	@apply h-10;
}
</style>
