/**
 * EaseInSine
 *
 * @since 0.0.2
 *
 * @param {number} t Current time
 * @param {number} b Starting value.
 * @param {number} c Change needed in value.
 * @param {number} d Expected easing duration
 * @return {number}
 */
export function easeInSine(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
