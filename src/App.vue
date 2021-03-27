<template>
	<div id="app">
		<h1>vue-stars</h1>
		<p>This is a minimal example used for development.</p>
		<VueStars class="big" name="Test" @update:modelValue="(v) => (value = v)" />
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import VueStars from "./VueStars.vue"

export default defineComponent({
	name: "VueStarsDemoApp",
	components: {
		VueStars,
	},
	data: () => ({
		value: 0,
	}),
})
</script>
<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	text-align: center;
	margin-top: 60px;
}

.big {
	font-size: 200%;
}
</style>
