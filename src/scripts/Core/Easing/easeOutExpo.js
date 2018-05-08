/**
 * EaseOutExpo
 *
 * @since 0.0.2
 *
 * @param {number} t Current time
 * @param {number} b Starting value.
 * @param {number} c Change needed in value.
 * @param {number} d Expected easing duration
 * @return {number}
 */
export function easeOutExpo(t, b, c, d) {
  return (t == d) ? b + c : c * 1.001 * (-Math.pow(2, -10 * t / d) + 1) + b;
}
