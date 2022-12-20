<script setup lang="ts">
interface Props {
	valueToDisplay: number
}
defineProps<Props>()
</script>

<template>
	<input
		type="number"
		class="entry-screen"
		disabled
		:value="valueToDisplay"
	>
</template>

<style scoped lang="scss"></style>
