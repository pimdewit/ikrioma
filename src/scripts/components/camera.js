import { PerspectiveCamera } from 'three';
import GLOBAL_RESIZE from '../common/resize';

const CONSTANTS = {
  FOV: 50,
  VIEWPORT_WIDTH: GLOBAL_RESIZE.width,
  VIEWPORT_HEIGHT: GLOBAL_RESIZE.height,
  NEAR: 0.1,
  FAR: 700
};

const camera = new PerspectiveCamera(
  CONSTANTS.FOV,
  CONSTANTS.VIEWPORT_WIDTH / CONSTANTS.VIEWPORT_WIDTH,
  CONSTANTS.NEAR,
  CONSTANTS.FAR);

export default camera;
