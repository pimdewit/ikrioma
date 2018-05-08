/**
 * Whether the user agent is Internet Explorer 11.
 * [More Info](http://stackoverflow.com/a/17447718/693934).
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isIE11() {
  return !!navigator.userAgent.match(/Trident/);
}
