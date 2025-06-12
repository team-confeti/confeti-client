import { globalStyle } from '@vanilla-extract/css';

/*
1. Prevent padding and border from affecting element width.
2. Allow adding a border to an element by just adding a border-width.
*/
globalStyle('*', {
  boxSizing: 'border-box' /*1 */,
  borderWidth: '0' /*2 */,
  borderStyle: 'solid' /*2 */,
  borderColor: 'currentColor' /*2 */,
});

globalStyle('::before, ::after', {
  boxSizing: 'inherit' /*1 */,
  borderWidth: '0' /*2 */,
  borderStyle: 'solid' /*2 */,
  borderColor: 'currentColor' /*2 */,
  // content: '""',
});

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured `sans` font-family by default.
5. Use the user's configured `sans` font-feature-settings by default.
6. Use the user's configured `sans` font-variation-settings by default.
7. Disable tap highlights on iOS.
*/
globalStyle('html, :host', {
  lineHeight: '1.5' /*1 */,
  WebkitTextSizeAdjust: '100%' /*2 */,
  MozTabSize: '4' /*3 */,
  tabSize: '4' /*3 */,
  fontFamily: 'Pretendard, system-ui, sans-serif' /*4 */,
  fontFeatureSettings: 'normal' /*5 */,
  fontVariationSettings: 'normal' /*6 */,
  WebkitTapHighlightColor: 'transparent' /*7 */,
});

/*
1. Remove the margin in all browsers.
2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.
*/
globalStyle('body', {
  margin: '0' /*1 */,
  lineHeight: 'inherit' /*2 */,
});

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox.
3. Ensure horizontal rules are visible by default.
*/
globalStyle('hr', {
  height: '0' /*1 */,
  color: 'inherit' /*2 */,
  borderTopWidth: '1px' /*3 */,
});

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/
globalStyle('abbr:where([title])', {
  textDecoration: 'underline dotted',
});

/*
Remove the default font size and weight for headings.
*/
globalStyle('h1, h2, h3, h4, h5, h6', {
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/
globalStyle('a', {
  color: 'inherit',
  textDecoration: 'inherit',
});

/*
Add the correct font weight in Edge and Safari.
*/
globalStyle('b, strong', {
  fontWeight: 'bolder',
});

globalStyle('p', {
  margin: '0',
});

/*
1. Use the user's configured `mono` font-family by default.
2. Use the user's configured `mono` font-feature-settings by default.
3. Use the user's configured `mono` font-variation-settings by default.
4. Correct the odd `em` font sizing in all browsers.
*/
globalStyle('code, kbd, samp, pre', {
  fontFamily: 'monospace' /*1 */,
  fontFeatureSettings: 'normal' /*2 */,
  fontVariationSettings: 'normal' /*3 */,
  fontSize: '1em' /*4 */,
});

/*
Add the correct font size in all browsers.
*/
globalStyle('small', {
  fontSize: '80%',
});

/*
Prevent `sub` and `sup` elements from affecting the line height in all browsers.
*/
globalStyle('sub, sup', {
  fontSize: '75%',
  lineHeight: '0',
  position: 'relative',
  verticalAlign: 'baseline',
});

globalStyle('sub', {
  bottom: '-0.25em',
});

globalStyle('sup', {
  top: '-0.5em',
});

/*
1. Remove text indentation from table contents in Chrome and Safari.
2. Correct table border color inheritance in all Chrome and Safari.
3. Remove gaps between table borders by default.
*/
globalStyle('table', {
  textIndent: '0' /*1 */,
  borderColor: 'inherit' /*2 */,
  borderCollapse: 'collapse' /*3 */,
});

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/
globalStyle('button, input, optgroup, select, textarea', {
  fontFamily: 'inherit' /*1 */,
  fontFeatureSettings: 'inherit' /*1 */,
  fontVariationSettings: 'inherit' /*1 */,
  fontSize: '100%' /*1 */,
  fontWeight: 'inherit' /*1 */,
  lineHeight: 'inherit' /*1 */,
  letterSpacing: 'inherit' /*1 */,
  color: 'inherit' /*1 */,
  margin: '0' /*2 */,
  padding: '0' /*3 */,
});

/*
Remove the inheritance of text transform in Edge and Firefox.
*/
globalStyle('button, select', {
  textTransform: 'none',
});

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/
globalStyle(
  'button, input:where([type="button"]), input:where([type="reset"]), input:where([type="submit"])',
  {
    WebkitAppearance: 'button' /*1 */,
    backgroundColor: 'transparent' /*2 */,
    backgroundImage: 'none' /*2 */,
  },
);

/*
Use the modern Firefox focus style for all focusable elements.
*/
globalStyle(':-moz-focusring', {
  outline: 'auto',
});

/*
Remove the additional `:invalid` styles in Firefox.
*/
globalStyle(':-moz-ui-invalid', {
  boxShadow: 'none',
});

/*
Add the correct vertical alignment in Chrome and Firefox.
*/
globalStyle('progress', {
  verticalAlign: 'baseline',
});

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/
globalStyle('::-webkit-inner-spin-button, ::-webkit-outer-spin-button', {
  height: 'auto',
});

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/
globalStyle('[type="search"]', {
  WebkitAppearance: 'textfield' /*1 */,
  outlineOffset: '-2px' /*2 */,
});

/*
Remove the inner padding in Chrome and Safari on macOS.
*/
globalStyle('::-webkit-search-decoration', {
  WebkitAppearance: 'none',
});

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to `inherit` in Safari.
*/
globalStyle('::-webkit-file-upload-button', {
  WebkitAppearance: 'button' /*1 */,
  font: 'inherit' /*2 */,
});

/*
Add the correct display in Chrome and Safari.
*/
globalStyle('summary', {
  display: 'list-item',
});

/*
Removes the default spacing and border for appropriate elements.
*/
globalStyle('fieldset', {
  margin: '0',
  padding: '0',
});

globalStyle('legend', {
  padding: '0',
});

globalStyle('ol, ul, menu', {
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

/*
Reset default styling for dialogs.
*/
globalStyle('dialog', {
  padding: '0',
});

/*
Prevent resizing textareas horizontally by default.
*/
globalStyle('textarea', {
  resize: 'vertical',
});

/*
1. Reset the default placeholder opacity in Firefox.
2. Set the default placeholder color to the user's configured gray 400 color.
*/
globalStyle('input::placeholder, textarea::placeholder', {
  opacity: '1' /*1 */,
  color: '#9ca3af' /*2 */,
});

/*
Set the default cursor for buttons.
*/
globalStyle('button, [role="button"]', {
  cursor: 'pointer',
});

/*
Make sure disabled buttons don't get the pointer cursor.
*/
globalStyle(':disabled', {
  cursor: 'default',
});

/*
1. Make replaced elements `display: block` by default.
2. Add `vertical-align: middle` to align replaced elements more sensibly by default.
*/
globalStyle('img, svg, video, canvas, audio, iframe, embed, object', {
  display: 'block' /*1 */,
  verticalAlign: 'middle' /*2 */,
});

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio.
*/
globalStyle('img, video', {
  maxWidth: '100%',
  height: 'auto',
});

/*
Make elements with the HTML hidden attribute stay hidden by default.
*/
globalStyle('[hidden]:where(:not([hidden="until-found"]))', {
  display: 'none',
});

/* Remove default margin and padding */
globalStyle(
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video',
  {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'baseline',
  },
);
