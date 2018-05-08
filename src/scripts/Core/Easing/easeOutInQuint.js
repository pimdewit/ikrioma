import {easeOutQuint} from './easeOutQuint';
import {easeInQuint} from './easeInQuint';

/**
 * EaseOutInQuint
 *
 * @since 0.0.2
 *
 * @param {number} t Current time
 * @param {number} b Starting value.
 * @param {number} c Change needed in value.
 * @param {number} d Expected easing duration
 * @return {number}
 */
export function easeOutInQuint(t, b, c, d) {
  if (t < d / 2) return easeOutQuint(t * 2, b, c / 2, d);
  return easeInQuint((t * 2) - d, b + c / 2, c / 2, d);
}
