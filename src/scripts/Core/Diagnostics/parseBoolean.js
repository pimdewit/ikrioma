/**
 * Get a boolean.
 *
 * @since 0.0.2
 *
 * @param {*} value - This can be anything really.
 * @returns {boolean} A boolean representative of whatever you passed through.
 */
export function parseBoolean(value) {
  if (value === 'false' || value === 0) {
    return false;
  } else if (value === 'true' || value === 1) {
    return true;
  } else {
    return !!value;
  }
}
