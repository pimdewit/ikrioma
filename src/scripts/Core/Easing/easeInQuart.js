/**
 * EaseInQuart
 *
 * @since 0.0.2
 *
 * @param {number} t Current time
 * @param {number} b Starting value.
 * @param {number} c Change needed in value.
 * @param {number} d Expected easing duration
 * @return {number}
 */
export function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}
