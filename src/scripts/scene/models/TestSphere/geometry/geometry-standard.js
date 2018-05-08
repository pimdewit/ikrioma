import ModelData from '../../robot/geometry/geometry-standard.obj.json';
import {geometryData} from '../../../../Core/Blender/geometryData'
import {fromBlenderData} from '../../../../Core/Geometry/fromBlenderData';

const data = getBlenderGeometryData(ModelData);
const buffer = blenderToBufferGeometry(data);

export const geometry = buffer;
