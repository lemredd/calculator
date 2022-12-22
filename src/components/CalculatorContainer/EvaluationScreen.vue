<script setup lang="ts">
interface Props {
	valueToDisplay: string
}
defineProps<Props>()
</script>

<template>
	<span class="evaluation-screen">
		{{ valueToDisplay }}
	</span>
</template>

<style scoped lang="scss"></style>
