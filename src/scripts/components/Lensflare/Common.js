import {BufferGeometry, InterleavedBuffer, InterleavedBufferAttribute} from "three";

function geometry() {
  const geometry = new BufferGeometry();

  const float32Array = new Float32Array([
    -1, -1, 0, 0, 0,
    1, -1, 0, 1, 0,
    1, 1, 0, 1, 1,
    -1, 1, 0, 0, 1
  ]);

  const interleavedBuffer = new InterleavedBuffer(float32Array, 5);

  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.addAttribute('position', new InterleavedBufferAttribute(interleavedBuffer, 3, 0, false));
  geometry.addAttribute('uv', new InterleavedBufferAttribute(interleavedBuffer, 2, 3, false));

  return geometry;
}

export const LensflareGeometry = geometry();

