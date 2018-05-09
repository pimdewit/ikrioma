/**
 * Whether the user agent is Safari.
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
