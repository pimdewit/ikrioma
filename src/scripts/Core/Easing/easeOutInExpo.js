import {easeOutExpo} from './easeOutExpo';
import {easeInExpo} from './easeInExpo';

/**
 * EaseOutInExpo
 *
 * @since 0.0.2
 *
 * @param {number} t Current time
 * @param {number} b Starting value.
 * @param {number} c Change needed in value.
 * @param {number} d Expected easing duration
 * @return {number}
 */
export function easeOutInExpo(t, b, c, d) {
  if (t < d / 2) return easeOutExpo(t * 2, b, c / 2, d);
  return easeInExpo((t * 2) - d, b + c / 2, c / 2, d);
}
