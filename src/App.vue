<template>
	<div id="app">
		<VueStars name="Test"/>
	</div>
</template>

<script>
import VueStars from "./components/VueStars.vue"

export default {
	name: "App",
	components: {
		VueStars,
	},
}
</script>

<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
	font-size: 200%;
}
</style>
