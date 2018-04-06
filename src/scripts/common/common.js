/**
 * @typedef {Object} Coordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * Get the X and Y coordinates of the pointer.
 *
 * @since 0.0.1
 *
 * @param {PointerEvent} event
 * @returns {Coordinates}
 */
export function getPointerCoordinates(event) {
  const coordinates = {
    x: 0,
    y: 0
  };

  if (event.x || event.x === 0) {
    coordinates.x = event.x;
    coordinates.y = event.y;
  } else if (event.pageX || event.pageX === 0) {
    coordinates.x = event.pageX;
    coordinates.y = event.pageY;
  } else if (event.touches) {
    if (event.touches[0].pageX || event.touches[0].pageX === 0) {
      coordinates.x = event.touches[0].pageX;
      coordinates.y = event.touches[0].pageY;
    }
  }

  return coordinates;
}

/**
 * Get a random number.
 *
 * @since 0.0.1
 *
 * @param {number} max
 * @returns {number}
 */
export function randomNumber(max) {
  return Math.random() * max - (max >> 1);
}

/**
 * Force 2 decimals on a number.
 *
 * @since 0.0.1
 *
 * @param {number} n
 * @returns {String}
 */
export function trimDecimals(n) {
  return (Math.round(n * 100) / 100).toFixed(2);
}
