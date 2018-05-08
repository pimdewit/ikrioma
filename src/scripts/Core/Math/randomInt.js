/**
 * Get a random integer.
 *
 * @since 0.0.2
 *
 * @param {number} max
 * @param {number} [opt_min=0]
 * @returns {number} A random number between the min argument and the max argument.
 */
export function randomInt(max, opt_min = 0) {
  const minimum = Math.ceil(opt_min);
  const maximum = Math.floor(max);
  const randomFactor = Math.random();
  return Math.floor(randomFactor * (maximum - minimum)) + minimum;
}
