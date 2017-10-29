# vue-stars
> Flexible input control for stars and things

## Development Status
IE11 support still needs some work, but otherwise this control is ready for real-world use. Please
let me know if it's helpful to you!

## Demo
A demo application is included demonstrating some of the flexibility of this control. For a live
demo, visit [https://www.tallent.us/vue-stars/](https://www.tallent.us/vue-stars/).

## Properties
The following properties are supported:

#### name
Name of the underlying form fields. The default is <kbd>rating</kbd>. This **must be unique** on
your page, otherwise browsers will apply changes to one rating to others with the same name. This
means if you have more than one `<vue-stars>` control on your page, this property *is* required.

### readonly
Like native input controls, if this is set, the user cannot make changes to the value, but the control
will still submit a value if it is part of a form. Hover animations are also disabled.

### value
The **integer** value of the current rating, from 0 (no set value) to `max`. Since this is a number,
be sure to use the v-bind syntax this attribute (*e.g.*, `:value="3"` rather than `value="3"`). If not
specified, the default value is `0`.

### char
This is the character to use for each rating. The default is the Unicode star (`★`).

If you would like to use a different character for each value from 1-`max`, you can provide a 
multi-character string. For example, a letter grade control could use `:max="5" char="FDCBA"`, making
the first rating value an `F`, the second a `D`, etc.

If `max` is longer than the string provided, the last character is used for all additional values. For
example, `:max="5" char="!★"` would result in a rating control that looks like this: `!★★★★`.

If you're using an icon font such as FontAwesome, providing a literal value could be troublesome since
it won't display in your code editor. Also, Vue does not interpret HTML/XML entity references in
attributes, so using something like `char="&#xF005;"` won't work. However, you can take advantage of
`v-bind`'s JavaScript interpretation and escape the character in Javascript, *e.g.*, `:char="'\uF005'"`.

While emoji characters are supported, many don't respond to CSS colors, so using a separate character
for `inactiveChar` (below) is highly recommended. Keep in mind that if you use the JavaScript encoding
for `char`, many emoji characters are outside the 16-bit range of `\uXXXX`, so you'll need to use the
surrogate pair form (lead and tail). There's an example of this using smilie faces in the sample app.

### inactiveChar
Sometimes, you may want to use a different set of characters for the "active" values than the "inactive"
ones. This property works exactly like `chars`, but applies only to values between `value+1` and `max`.
If not provided, this falls back to the `char` property.

For example, to use the Unicode "white star" (`☆`) for the inactive values, use `inactive-char="☆"`.

This is especially useful for icon fonts such as FontAwesome that provide different glyphs for on/off
state. It may also be a useful way to allow use of emoji characters, since those characters don't
respond to CSS font color (making it difficult to distinguish the current value).

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

## Customizing the Style
Font family and size can be adjusted easily with plain old CSS, just target the selector `.vue-stars` or
add your own class to your `<vue-stars/>` element.

The active, inactive, shadow, and hover colors can be set using optional properties, which eliminates the
need to create complicated CSS rules in your application to override the defaults. <b>These properties have
no impact on IE11</b> but work on modern browsers, and the properties are reactive to changes. Internally,
the component uses watchers to detect when these properties have changed and sets CSS variables in response.

## License ("MIT")
Copyright 2017 Richard S. Tallent, II

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Release History
| Date | Version | Notes |
| --- | --- | --- |
| 2017.10.28 | 0.1.0 | First published version |
