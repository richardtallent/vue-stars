<template>
	<div class="vue-stars" :class="{readonly:readonly}" ref="ratingEl">
		<input type="radio" :id="formName+'0'" :checked="value===0" :name="formName" value="0"></input>
		<template v-for="x in max">
			<label :for="formName+x" :key="'l'+x"><span class="active">{{getActiveLabel(x)}}</span><span class="inactive">{{getInactiveLabel(x)}}</span></label><input :key="'i'+x"
				type="radio" 
				:checked="value===x"
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
	name: 'vue-stars',
	mounted: function(){
		this.setColors();
	},
	computed: {
		ratingChars() { return Array.from(this.char) },
		inactiveRatingChars() { return this.inactiveChar ? Array.from(this.inactiveChar) : this.ratingChars },
		formName() { return this.name || 'rating' }
	},
	watch: {
		activeColor: function(value) { this.setColors(); },
		shadowColor: function(value) { this.setColors(); },
		hoverColor: function(value) { this.setColors(); },
	},
	props: {
		max: { type: Number, required: false, default: 5 },
		value: { type: Number, required: false, default: 0 },
		name: { type: String, required: false, default: 'rating' },
		char: { type: String, required: false, default: '★' },
		inactiveChar: { type: String, required: false },
		readonly: { type: Boolean, required: false, default: false },
		activeColor: { type: String, required: false, default: '#FD0'},
		inactiveColor: { type: String, required: false, default: '#999' },
		shadowColor: { type: String, required: false, default: '#FF0' },
		hoverColor: { type: String, required: false, default: '#DD0' },
	},
	methods: {
		updateInput(v) {
			this.$emit('input', v);
		},
		getActiveLabel(x) {
			const s = this.ratingChars;
			return s[Math.min(s.length-1, x-1)];
		},
		getInactiveLabel(x) {
			const s = this.inactiveRatingChars;
			return s[Math.min(s.length-1, x-1)];
		},
		setColors() {
			const s = this.$refs.ratingEl.style;
			s.setProperty("--active-color", this.activeColor);
			s.setProperty("--inactive-color", this.inactiveColor);
			s.setProperty("--shadow-color", this.shadowColor);
			s.setProperty("--hover-color", this.hoverColor);
		}
	}
}
</script>
<style>

	.vue-stars {
		display:		inline-flex;
		flex-flow: 		row nowrap;
		align-items:	flex-start center;
		line-height:	1em;
	}

	.vue-stars label {
		display:		block;
		padding:		0.125em;
		width:			1em;
		text-align:		center;
		color:			#FD0;
		text-shadow:	0 0 .3em #FF0;
	}

	.vue-stars input,
	.vue-stars:not(.readonly):hover label span.inactive,
	.vue-stars label span.inactive {
		display:		none;
	}

	.vue-stars:not(.readonly):hover label {
		color:			#DD0;
		text-shadow:	0 0 .3em #FF0;
	}

	.vue-stars:not(.readonly):hover label span.active {
		display:		inline;
	}

	input:checked ~ label,
	.vue-stars:not(.readonly) label:hover ~ label {
		color:			#999;
		text-shadow:	none;
	}

	.vue-stars input:checked ~ label span.inactive,
	.vue-stars:not(.readonly) label:hover ~ label span.inactive {
		display:		inline;
	}

	.vue-stars input:checked ~ label span.active,
	.vue-stars:not(.readonly) label:hover ~ label span.active {
		display:		none;
	}

	@supports (color: var(--prop)) {
		.vue-stars label {
			color:			var(--active-color);
			text-shadow:	0 0 .3em var(--shadow-color);
		}
		.vue-stars:not(.readonly):hover label {
			color:			var(--hover-color);
			text-shadow:	0 0 .3em var(--shadow-color);
		}
		.vue-stars input:checked ~ label,
		.vue-stars:not(.readonly) label:hover ~ label {
			color:			var(--inactive-color);
		}
	}

</style>