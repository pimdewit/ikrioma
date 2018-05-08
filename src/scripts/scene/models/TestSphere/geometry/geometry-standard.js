import ModelData from '../../robot/geometry/geometry-standard.obj.json';
import {geometryData} from '../../../../Core/Blender/geometryData'
import {fromBlenderData} from '../../../../Core/Geometry/fromBlenderData';

const data = geometryData(ModelData);
const buffer = fromBlenderData(data);

export const geometry = buffer;
