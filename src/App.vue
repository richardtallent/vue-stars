<template>
	<div id="app" class="content">

		<h1 class="title is-spaced">Vue-Rating</h1>

		<p><b>vue-rating</b> is a Vue component designed for displaying or allowing user input of ratings (such as stars).</p>

		<p>Usage is quite simple, and <kbd>v-model</kbd> is supported. Here's a minimal example:</p>

		<pre>&lt;vue-rating&gt;&lt;/vue-rating&gt;</pre>
		<div class="box">
			<vue-rating></vue-rating>
		</div>
		<p>The following properties are supported:</p>
		<dl>
			<dt>name</dt>
			<dd>Name of the underlying form field (which uses radio buttons). The default is <kbd>rating</kbd>.</dd>
			<dt>readonly</dt>
			<dd>If set, the field will show the value, but not allow the user to change it.</dd>
			<dt>value</dt>
			<dd>The current value. This should be a number, so be sure to use <kbd>:value</kbd> if setting it to a scalar value.</dd>
			<dt>max</dt>
			<dd>The maximum rating. The default is <kbd>5</kbd>.</dd>
			<dt>char</dt>
			<dd>The character to use for the rating. The default is a Unicode star (<kbd>★</kbd>). You can set a different
				character for each rating value by providing a multi-character string. Note that if you want to use
				JavaScript escaping for the character(s), you have to use <kdb>v-bind</kdb> form and put the escaped
				string inside single quotes so it evaluates in JavaScript. For a normal attribute, you can use <HTML>
				character encoding.</HTML></dd>
			<dt>color</dt>
			<dd>The primary color to use for the selected rating, in any valid CSS form. The default is <kbd>#FFE700</kbd>.</dd>
		</dl>

		<h2 class="title is-2 is-spaced">More Examples</h2>

		<h3 class="subtitle is-4 is-spaced">Rating 1-3, using happy faces (☺)</h3>
		<pre>&lt;vue-rating :max="3" char="☺"&gt;&lt;/vue-rating&gt;</pre>
		<div class="box">
			<vue-rating name="myHappyRating" :max="3" char="☺"></vue-rating>
		</div>

		<h3 class="subtitle is-4">Rating 1-7, using eight-pointed pinwheel stars (✵) and an initial value of 5</h3>
		<pre>&lt;vue-rating :max="7" char="✵" :value="5"&gt;&lt;/vue-rating&gt;</pre>
		<div class="box">
			<vue-rating name="myPinwheelRating" :max="7" char="✵" :value="5"></vue-rating>
		</div>

		<h3 class="subtitle is-4">Rating 1-5, using letters and an initial value of 2</h3>
		<pre>&lt;vue-rating char="ABCDE" :value="2"&gt;&lt;/vue-rating&gt;</pre>
		<div class="box">
			<vue-rating name="myLetterRating" char="ABCDE" :value="2"></vue-rating>
		</div>

		<h3 class="subtitle is-4">Rating 1-5, using Roman numerals and an initial value of 4</h3>
		<pre>&lt;vue-rating char="ⅠⅡⅢⅣⅤ" :value="4"&gt;&lt;/vue-rating&gt;</pre>
		<div class="box">
			<vue-rating name="myRomanRating" char="ⅠⅡⅢⅣⅤ" :value="4"></vue-rating>
		</div>

		<h3 class="subtitle is-4">Rating 1-5, using FontAwesome's star and an initial value of 3</h3>
		<pre>&lt;vue-rating id="FARating" :char="'\uF005'" :value="3"&gt;&lt;/vue-rating&gt;</pre>
		<div class="box">
			<vue-rating id="FARating" name="myFARating" :char="'\uF005'" :value="3"></vue-rating>
		</div>

		<h2 class="title is-2 is-spaced">Using Emoji</h2>

		<p>It is not possible to use emoji characters, because they don't respond to the CSS font color
		and text-stroke properties, so the user has no feedback on which value is selected. It may be
		possible to make something workable using different CSS attributes, such as borders and background
		colors on the labels themselves, but I haven't looked into this. If you want to do this, it should
		be possible to add your styling without having to modify the component.</p>

		<h2 class="title is-2 is-spaced">Customizing the Style</h2>

		<p class="is-spaced">Font family and size can be adjusted easily with plain old CSS, just target ".vue-rating".
		(Yes, this means you can easily use FontAwesome's glyphs for your stars, etc.)</p>

		<p class="is-spaced">However, because of the complex selectors used to make this component react to hover states,
		this is not a good solution for changing the golden color to some other color scheme. Normal
		<kbd>style</kbd> attributes bound to Vue template logic won't work, because you can't use the
		element <kbd>style</kbd> attribute to target <kbd>:hover</kbd> or child/sibling elements.</p>

		<p>To address this, I'm experimenting with using Vue properties and watchers in combination with
		CSS variables to allow callers to switch out the colors without having to duplicate the class
		rules. Vue has no out of the box support for this, and it doesn't work on IE11 (due to lack of
		support of CSS variables), but I think I've worked out a way to make this happen.</p>

		<h2 class="title is-2 is-spaced">License</h2>

		<p>MIT</p>

		<h2 class="title is-2 is-spaced">Status</h2>

		<p>This is almost but not quite ready for prime time yet. Needs additional improvements to theming
		properties and hopefully some fallbacks for IE11. I only have it on GitHub so I can play with it on
		several different machines. Happy to hear from anyone interested in helping.</p>

	</div>
</template>
<script>
import VueRating from './components/vue-rating'

export default {
  name: 'app',
  props: {
	  currentRating: { type: Number, default: 3 }
  },
  components: {
    VueRating
  }
}
</script>
<style>
	.vue-rating { font-size: 1.25em; }

	.vue-rating.blue {
		color: #3366CC;
		-webkit-text-stroke: 0;
		text-shadow:	0 0 0.2em #69f;
	}

	@font-face {
		font-family: FontAwesome;
		src: url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/fonts/fontawesome-webfont.woff);
	}

	#FARating {
		font-family: FontAwesome;
	}

</style>
