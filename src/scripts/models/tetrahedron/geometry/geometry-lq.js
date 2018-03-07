import { BufferGeometry, BufferAttribute } from 'three';

import geometryData from '../../robot/geometry/geometry-lq.obj.json';

const preGeometry = new BufferGeometry();
const scale = -0.5;

const verticeArray = new Float32Array(geometryData.geometries[0].data.attributes.position.array);
const vertices = new BufferAttribute(verticeArray, 3);
preGeometry.addAttribute('position', vertices);
preGeometry.scale(scale, scale, scale);
export const geometry = preGeometry;
