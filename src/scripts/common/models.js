import {BufferGeometry, Float32BufferAttribute} from 'three';

/**
 * Take a blender JSON export, and return solely the geometry related data.
 * @param {Object} data
 * @returns {Object}
 */
export function getBlenderGeometryData(data) {
  if (data.geometries) return data.geometries[0].data;
  if (data.data) return data.data;
}

/**
 * Turn the raw geometry data from a blender export into a BufferGeometry.
 * @param {Object} geometryData
 * @returns {BufferGeometry}
 */
export function blenderToBufferGeometry(geometryData) {
  const buffer = new BufferGeometry();

  const vertices = new Float32Array(geometryData.attributes.position.array);
  const normals = new Float32Array(geometryData.attributes.normal.array);

  buffer.setIndex(geometryData.index.array);
  buffer.addAttribute('position', new Float32BufferAttribute(vertices, 3));
  buffer.addAttribute('normal', new Float32BufferAttribute(normals, 3));

  return buffer;
}
