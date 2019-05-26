<template>
	<div
		ref="ratingEl"
		class="vue-stars"
		:class="{ readonly: readonly, notouch: notouch }"
		:style="mapCssProps"
	>
		<input :id="name + '0'" :checked="value===0" :name="name" type="radio" value="0">
		<template v-for="x in max">
			<label :key="'l' + x" :for="name + x">
				<span class="active">
					<slot name="activeLabel">{{ getActiveLabel(x) }}</slot>
				</span>
				<span class="inactive">
					<slot name="inactiveLabel">{{ getInactiveLabel(x) }}</slot>
				</span>
			</label>
			<input
				:id="name + x"
				:key="'i' + x"
				type="radio"
				:checked="value === x"
				:name="name"
				:disabled="readonly"
				:value="x"
				@change="updateInput($event.target.value)">
		</template>
	</div>
</template>
<script>
export default {
	name: "VueStars",
	props: {
		max: { type: Number, required: false, default: 5 },
		value: { type: Number, required: false, default: 0 },
		name: { type: String, required: false, default: "rating" },
		char: { type: String, required: false, default: "★" },
		inactiveChar: { type: String, required: false, default: null },
		readonly: { type: Boolean, required: false, default: false },
		activeColor: { type: String, required: false, default: null },
		inactiveColor: { type: String, required: false, default: null },
		shadowColor: { type: String, required: false, default: null },
		hoverColor: { type: String, required: false, default: null },
	},
	computed: {
		ratingChars() {
			return Array.from(this.char)
		},
		inactiveRatingChars() {
			/* Default to ratingChars if no inactive characters have been provided */
			return this.inactiveChar
				? Array.from(this.inactiveChar)
				: this.ratingChars
		},
		notouch() {
			/* For iPhone specifically but really any touch device, there is no true hover state, disables any pseudo-hover activity. */
			return !("ontouchstart" in document.documentElement)
		},
		mapCssProps() {
			const result = {}
			if (this.activeColor) result["--active-color"] = this.activeColor
			if (this.inactiveColor) result["--inactive-color"] = this.inactiveColor
			if (this.shadowColor) result["--shadow-color"] = this.shadowColor
			if (this.hoverColor) result["--hover-color"] = this.hoverColor
			return result
		},
	},
	methods: {
		updateInput(v) {
			this.$emit("input", parseInt(v, 10))
		},
		getActiveLabel(x) {
			const s = this.ratingChars
			return s[Math.min(s.length - 1, x - 1)]
		},
		getInactiveLabel(x) {
			const s = this.inactiveRatingChars
			return s[Math.min(s.length - 1, x - 1)]
		},
	},
}
</script>
<style>
.vue-stars {
	display: inline-flex;
	flex-flow: row nowrap;
	align-items: flex-start center;
	line-height: 1em;
}

.vue-stars label {
	display: block;
	padding: 0.125em;
	width: 1.2em;
	text-align: center;
	color: #fd0;
	text-shadow: 0 0 0.3em #ff0;
}

.vue-stars input,
.vue-stars label .inactive,
.vue-stars input:checked ~ label .active,
.vue-stars.notouch:not(.readonly):hover label .inactive,
.vue-stars.notouch:not(.readonly) label:hover ~ label .active {
	display: none;
}

.vue-stars input:checked ~ label .inactive,
.vue-stars.notouch:not(.readonly):hover label .active,
.vue-stars.notouch:not(.readonly) label:hover ~ label .inactive {
	display: inline;
}

.vue-stars.notouch:not(.readonly):hover label {
	color: #dd0;
	text-shadow: 0 0 0.3em #ff0;
}

.vue-stars input:checked ~ label,
.vue-stars.notouch:not(.readonly) label:hover ~ label {
	color: #999;
	text-shadow: none;
}

@supports (color: var(--prop)) {
	.vue-stars label {
		color: var(--active-color, #fd0);
		text-shadow: 0 0 0.2em var(--shadow-color, #ff0);
	}
	.vue-stars.notouch:not(.readonly):hover label {
		color: var(--hover-color, #dd0);
		text-shadow: 0 0 0.2em var(--shadow-color, #ff0);
	}
	.vue-stars input:checked ~ label,
	.vue-stars.notouch:not(.readonly) label:hover ~ label {
		color: var(--inactive-color, #999);
	}
}
</style>
