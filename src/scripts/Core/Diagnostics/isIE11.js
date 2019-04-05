/**
 * Whether the user agent is Internet Explorer 11.
 * @see {@link http://stackoverflow.com/a/17447718/693934|More Info}
 * @return {boolean}
 */
export function isIE11() {
  return !!navigator.userAgent.match(/Trident/);
}




