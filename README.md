# vue-stars

> Flexible VueJS input control for ratings (stars, etc.)

## Development Status

The current version is 0.3.0. With the caveats under Browser Compatibility below, this control
is ready for real world use! Please let me know if it's helpful to you.

## Demo

A demo application is included demonstrating some of the flexibility of this control. For a live
demo, visit [https://www.tallent.us/vue-stars/](https://www.tallent.us/vue-stars/).

## Properties

The following properties are supported:

### name

Name of the underlying form fields. The default is <kbd>rating</kbd>. This **must be unique** on
your page, otherwise browsers will apply changes to one rating to others with the same name. This
means if you have more than one `<vue-stars>` control on your page, this property _is_ required.

### readonly

Like native input controls, if this is set, the user cannot make changes to the value, but the control
will still submit a value if it is part of a form. Hover animations are also disabled.

### value

The **integer** value of the current rating, from 0 (no set value) to `max`. Since this is a number,
_be sure_ to use the v-bind syntax this attribute (_e.g._, `:value="3"` rather than `value="3"`). If not
specified, the default value is `0`.

### max

The **integer** maximum rating (_e.g._, number of stars or other character the user can choose from).
Since this is a number, _be sure_ to use the v-bind syntax this attribute (_e.g._, `:max="3"` rather
than `max="3"`). If not specified, the default is `5`.

### char

This is the character to use for each rating. The default is the Unicode star (`★`).

If you would like to use a different character for each value from 1-`max`, you can provide a
multi-character string. For example, a letter grade control could use `:max="5" char="FDCBA"`, making
the first rating value an `F`, the second a `D`, etc.

If `max` is longer than the string provided, the last character in `char` is used for all additional
values. For example, `:max="5" char="!★"` would result in a rating control like this: `!★★★★`.

If you're using an icon font such as FontAwesome, providing a literal value could be troublesome since
it won't display in your code editor. Also, Vue does not interpret HTML/XML entity references in
attributes, so using something like `char="&#xF005;"` won't work. However, you can take advantage of
`v-bind`'s JavaScript interpretation and escape the character in Javascript, _e.g._, `:char="'\uF005'"`.

While emoji characters are supported, many don't respond to CSS colors, so using a separate character
for `inactiveChar` (below) is highly recommended. Keep in mind that if you use the JavaScript encoding
for `char`, many emoji characters are outside the 16-bit range of `\uXXXX`, so you'll need to use the
surrogate pair form (lead and tail). There's an example of this using smiling faces in the sample app.

### inactiveChar

Sometimes, you may want to use a different set of characters for the "active" values than the "inactive"
ones. This property works exactly like `chars`, but applies only to values between `value+1` and `max`.
If not provided, this falls back to the `char` property.

For example, to use the Unicode "white star" (`☆`) for the inactive values, use `inactive-char="☆"`.

This is especially useful for icon fonts such as FontAwesome that provide different glyphs for on/off
state. It may also be a useful way to allow use of emoji characters, since those characters don't
respond to CSS font color (making it difficult to distinguish the current value if the same character
is used for active and inactive values).

## Color Properties

Some additional properties are supported on all modern browsers (in other words, not on IE11). These
all accept any normal CSS color expression (triplets, `rgb()`, etc.). Remember to use kebab-case for
your attributes.

### activeColor

If specified, this overrides the default gold color used for the active values.

### inactiveColor

If specified, this overrides the default grey color used for the active values.

### hoverColor

If specified, this overrides the default lighter gold color used when hovering over a value.

### shadowColor

If specified, this overrides the default light yellow color used for the active values. (Inactive
values don't have a shadow.)

## Events

Since this is a custom input control, this component emits a single event, `input`, when a new value
is selected by the user (the value is returned as the first argument). This event is required for
`v-model` to work properly (if you choose to use it).

## Browser Compatibility

This component is <i>at least</i> compatible with the current versions of Chrome, Firefox, Edge, iOS
Safari, and desktop Safari.

IE11 is partially supported. The JavaScript should transpile properly, but it will need a polyfill
for the ES6 method `Array.from`, and customized colors are not supported (since IE11 lacks CSS
variable support).

## Implementation Details

Under the hood, this control uses radio buttons. The buttons themselves are hidden, the user interacts
with the corresponding `<label>` tags.

As with any Vue input component, the component's `value` property won't automatically change to match
the user's selection (though the unerlying DOM value will). You'll need to either listen for the `input`
event and change the property yourself, or use `v-model` to set up two-way binding.

To work around a known (but obscure) issue with Apple iPhone/iPad, the hover animations are disabled
for touch screen devices.

CSS custom variables are used to implement the custom color properties. I'm hopeful that in the future,
Vue will support reactive CSS custom properties natively with handlebar replacements in the style area
of the SFCs.

## Customizing the Style

Custom colors are handled using properties. To override all other styling, you can use plain old CSS.
The main `div` for these components has a `vue-stars` class.

## Build Setup

```bash
# install dependencies
npm install

# build for production with minification
npm run build
```

## Release History

| Date       | Version | Notes                                                                                      |
| ---------- | ------- | ------------------------------------------------------------------------------------------ |
| 2017.10.28 | 0.1.0   | First published version                                                                    |
| 2017.10.30 | 0.2.0   | Fixes mostly for iOS Safari                                                                |
| 2017.12.16 | 0.3.0   | Rebuild configs from scratch, remove sample app, hopefully building a proper component now |
