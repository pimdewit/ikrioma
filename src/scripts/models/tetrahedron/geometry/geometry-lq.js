import {BufferGeometry, BufferAttribute, Float32BufferAttribute} from 'three';

import geometryData from '../../robot/geometry/geometry-lq.obj.json';

const preGeometry = new BufferGeometry();
const scale = -0.5;

const vertices = new Float32Array(geometryData.geometries[0].data.attributes.position.array);
const normals = new Float32Array(geometryData.geometries[0].data.attributes.normal.array);

preGeometry.setIndex(geometryData.geometries[0].data.index.array);
preGeometry.addAttribute('position', new Float32BufferAttribute(vertices, 3));
preGeometry.addAttribute('normal', new Float32BufferAttribute(normals, 3));
preGeometry.scale(scale, scale, scale);
export const geometry = preGeometry;
