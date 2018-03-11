import ModelData from '../../robot/geometry/geometry-standard.obj.json';
import {blenderToBufferGeometry, getBlenderGeometryData} from "../../../common/models";

const data = getBlenderGeometryData(ModelData);
const buffer = blenderToBufferGeometry(data);

export const geometry = buffer;
