/**
 * Whether the user agent represents iOS.
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isIOS() {
  return /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
}
