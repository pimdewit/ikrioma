/**
 * Force decimals on a number.
 *
 * @since 0.0.2
 *
 * @param {number} n
 * @param {number} [opt_decimals=2]
 * @returns {String}
 */
export function trimDecimals(n, opt_decimals = 2) {
  return (Math.round(n * 100) / 100).toFixed(opt_decimals);
}
