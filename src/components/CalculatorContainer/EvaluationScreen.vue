<script setup lang="ts">
interface Props {
	valueToDisplay: string
}
defineProps<Props>()
</script>

<template>
	<input
		type="text"
		class="evaluation-screen"
		disabled
		:value="valueToDisplay"
	>
</template>

<style scoped lang="scss"></style>
