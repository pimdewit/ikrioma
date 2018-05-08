import {easeOutSine} from './easeOutSine';
import {easeInSine} from './easeInSine';

/**
 * EaseOutInSine
 *
 * @since 0.0.2
 *
 * @param {number} t Current time
 * @param {number} b Starting value.
 * @param {number} c Change needed in value.
 * @param {number} d Expected easing duration
 * @return {number}
 */
export function easeOutInSine(t, b, c, d) {
  if (t < d / 2) return easeOutSine(t * 2, b, c / 2, d);
  return easeInSine((t * 2) - d, b + c / 2, c / 2, d);
}
