import {BufferGeometry, Float32BufferAttribute} from 'three';

/**
 * Turn the raw geometry data from a blender export into a BufferGeometry.
 *
 * @since 0.0.2
 *
 * @param {object} geometryData
 * @returns {BufferGeometry}
 */
export function fromBlenderData(geometryData) {
  const buffer = new BufferGeometry();

  const vertices = new Float32Array(geometryData.attributes.position.array);
  const normals = new Float32Array(geometryData.attributes.normal.array);

  const verticeBuffer = new Float32BufferAttribute(vertices, 3);
  const normalBuffer = new Float32BufferAttribute(normals, 3);

  buffer.setIndex(geometryData.index.array);
  buffer.addAttribute('position', verticeBuffer);
  buffer.addAttribute('normal', normalBuffer);

  return buffer;
}
