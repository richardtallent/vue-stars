<template>
	<div class="vue-rating" :class="{readonly:readonly}" ref="ratingEl">
		<input type="radio" :id="formName+'0'" :checked="currentValue===0" :name="formName" value="0"></input>
		<template v-for="x in ratingCount">
			<label :for="formName+x">{{getLabel(x)}}</label><input 
				type="radio" 
				:checked="currentValue===x"
				@change="updateInput($event.target.value)"
				:id="formName+x"
				:name="formName"
				:disabled="readonly"
				:value="x"></input>
		</template>
	</div>
</template>
<script>
export default {
	name: 'vue-rating',
	mounted: function(){
		this.setColors();
	},
	computed: {
		ratingCount() { return this.max || 5; },
		ratingChars() { return this.char ? Array.from(this.char) : ["★"]; },
		formName() { return this.name || 'rating' },
		currentValue() { return this.value || 0 },
		activeColor() { return this.color || '#FFD700' }
	},
	watch: {
		activeColor: function(value) {
			this.$refs.ratingEl.style.setProperty("--active-color", value);
		}
	},
	props: {
		max: Number,
		value: Number,
		name: String,
		char: String,
		color: String,
		readonly: Boolean
	},
	methods: {
		updateInput(v) {
			this.$emit('input', v);
		},
		getLabel(x) {
			const s = this.ratingChars;
			return s[Math.min(s.length-1, x-1)];
		},
		setColors() {
			this.$refs.ratingEl.style.setProperty("--active-color", this.activeColor);
		}
	}
}
</script>
<style>

	.vue-rating {
		--active-color: #FFE700;
		--shadow-color: #FF0;
		--inactive-color: #CCC;
		--active-color-border: #FFD700;
		--hover-color: #FC0;
	}

	.vue-rating {
		display:		flex;
		flex-flow: 		row nowrap;
		align-items:	flex-start center;
		overflow-x:		hidden;
		line-height:	1em;
		color:			var(--active-color);
		-webkit-text-stroke: 0.02em var(--active-color-border);
		text-shadow:	0 0 0.3em var(--shadow-color);
	}

	.vue-rating label {
		display:		block;
		padding:		0.125em;
	}

	.vue-rating input {
		display:		none;
	}

	.vue-rating:not(.readonly):hover label {
		color:			var(--hover-color);
		-webkit-text-stroke: 0.05em var(--hover-color);
	}

	input:checked ~ label,
	.vue-rating:not(.readonly) label:hover ~ label {
		color:			var(--inactive-color);
		-webkit-text-stroke: 0;
		text-shadow: none;
	}

</style>