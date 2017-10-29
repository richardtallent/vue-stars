<template>
	
	<div id="app">

		<section class="hero is-medium is-info is-bold">
			<div class="hero-body">
				<div class="container">
					<h1 class="title">vue-stars</h1>
					<h2 class="subtitle">Flexible input control for stars and things</h2>
				</div>
			</div>
		</section>

		<section class="section">
			<div class="container">
				<div class="content">
					
					<p><b>vue-stars</b> is a Vue component for <b>display or input</b> of "ratings" (such as stars).
					It supports `v-model` binding and is quite customizable, and is available under the MIT license.</p>

					<p>For detailed documentation, please see <a href="https://github.com/richardtallent/vue-stars">the Github
					repository</a>. This page contains demos illustrating some of the flexibility of this control.</p>

					<p>(In all demos below, the border is added by this demo page, the vue-stars control itself has
					no default border.)</p>

					<h2 class="title is-2 is-spaced">Demos!</h2>

					<h5 class="subtitle is-5 is-spaced">Simplest possible example:</h5>
					<pre>&lt;vue-stars/&gt;</pre>
					<div class="box">
						<vue-stars v-model="simple" />
					</div>

					<h5 class="subtitle is-5 is-spaced">Rating 1-3, using happy faces (☺), no default value:</h5>
					<pre>&lt;vue-stars :max="3" char="☺"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="happy" name="myHappyRating" :max="3" char="☺"/>
					</div>

					<h5 class="subtitle is-5">Rating 1-7, using eight-pointed pinwheel stars (✵), an initial value of 5:</h5>
					<pre>&lt;vue-stars char="✵" :value="5" :max="7"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="pinwheel" name="myPinwheelRating" char="✵" :max="7"/>
					</div>

					<h5 class="subtitle is-5 is-spaced">Rating 1-5, value of 4, read only:</h5>
					<pre>&lt;vue-stars readonly :value="4"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="ro" name="myRORating" readonly />
					</div>

					<h5 class="subtitle is-5">Rating 1-5, using letters, an initial value of 2, in blue, and a dash for inactive values:</h5>
					<pre>&lt;vue-stars char="ABCDE" inactive-char="-" :value="2" active-color="#39C" shadow-color="#BBF" hover-color="#3CF"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="letter" name="myLetterRating" char="ABCDE" inactive-char="-" active-color="#39C" shadow-color="#BBF" hover-color="#3CF"/>
					</div>

					<h5 class="subtitle is-5">Rating 1-5, using Roman numerals and an initial value of 4, and grey colors:</h5>
					<pre>&lt;vue-stars char="ⅠⅡⅢⅣⅤ" :value="4"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="roman" name="myRomanRating" char="ⅠⅡⅢⅣⅤ" active-color="#333" inactive-color="#DDD" shadow-color="#CCC" hover-color="#666"/>
					</div>

					<h5 class="subtitle is-5">Rating 1-5, using FontAwesome's star and an initial value of 3:</h5>
					<pre>&lt;vue-stars :char="'\uF005'" :value="3"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="fa1" name="FARating" class="fa" :char="'\uF005'"/>
					</div>

					<h5 class="subtitle is-5">Another FontAwesome example, using the unfilled star for inactive values:</h5>
					<pre>&lt;vue-stars :char="'\uF005'" :inactive-char="'\uF006'" :value="3" inactive-color="#DDD"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="fa2" name="myFARating2" class="fa" :char="'\uF005'" :inactive-char="'\uF006'" inactive-color="#DDD"/>
					</div>

					<h5 class="subtitle is-5">Green checkboxes and dashes:</h5>
					<pre>&lt;vue-stars :char="'\u2714'" inactive-char="-" :value="3" active-color="#339933" hover-color="#44aa44" shadow-color="#6c6" inactive-color="#DDD"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="check" name="myCheckRating" :char="'\u2714'" inactive-char="-" active-color="#339933" hover-color="#44aa44" shadow-color="#6c6" inactive-color="#DDD"/>
					</div>

					<h5 class="subtitle is-5">Smilie face emoji with dashes:</h5>
					<pre>&lt;vue-stars :char="'\uD83D\uDE00'" inactive-char="-" :value="2"/&gt;</pre>
					<div class="box">
						<vue-stars v-model="smile" name="mySmileRating" :char="'\uD83D\uDE00'" inactive-char="-"/>
					</div>

					<h2 class="title is-2 is-spaced">Contact</h2>

					<p>For more information, please feel free to reach out to me using Github issues, or via the contact methods
					on my <a href="https://www.tallent.us">home page</a>.</p>

				</div>
			</div>
		</section>

	</div>
</template>
<script>
import VueStars from './components/vue-stars'

export default {
  name: 'app',
  data: function() { return { 
		simple: 0,
		happy: 0,
		pinwheel: 5,
		ro: 4,
		letter: 2,
		roman: 4,
		fa1: 3,
		fa2: 3,
		check: 3,
		smile: 2
	}; },
  components: {
    VueStars
  }
}
</script>
<style>
	.vue-stars { font-size: 1.25em; }

	@font-face {
		font-family: FontAwesome;
		src: url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff);
	}

	.fa {
		font-family: FontAwesome;
	}

</style>
