/**
 * Take a blender JSON export, and return solely the geometry related data.
 * Returns a reference to the geometry inside the original object.
 *
 * @since 0.0.2
 *
 * @param {object} data
 * @returns {object}
 */
export function geometryData(data) {
  if (data.geometries) {
    return data.geometries[0].data;
  }

  if (data.data) {
    return data.data;
  }
}
