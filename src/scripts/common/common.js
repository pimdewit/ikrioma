/**
 * @typedef {Object} Coordinates
 * @property {Number} x
 * @property {Number} y
 */

/**
 * Get the X and Y coordinates of the pointer.
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


