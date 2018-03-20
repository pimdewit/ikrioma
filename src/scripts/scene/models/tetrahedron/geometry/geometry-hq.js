import ModelData from '../../marauder/geometry/untitled.json';
import {blenderToBufferGeometry, getBlenderGeometryData} from "../../../common/models";

const data = getBlenderGeometryData(ModelData);
const buffer = blenderToBufferGeometry(data);
export const geometry = buffer;

