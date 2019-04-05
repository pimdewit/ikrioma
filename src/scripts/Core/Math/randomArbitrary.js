/**
 * Get a random float.
 *
 * @since 0.0.2
 *
 * @param {number} max
 * @param {number} [opt_min=0]
 * @return {number} A random float number between the min argument and the max argument.
 */
export function randomArbitrary(max, opt_min = 0) {
  return Math.random() * (max - opt_min) + opt_min;
}
