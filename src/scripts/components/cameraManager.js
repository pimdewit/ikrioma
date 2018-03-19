import GLOBAL_RESIZE from "../common/resize";

export const CONSTANTS = {
  fov: 50,
  aspect: GLOBAL_RESIZE.width / GLOBAL_RESIZE.height,
  near: 0.1,
  far: 700
};

class CameraManager {
  constructor() {
    this.cameras = {};
    this._activeCameraName = '';
  }

  set activeCamera(name) {
    this._activeCameraName = name;
    this._activeCamera = this.cameras[name];
  }

  get activeCamera() {
    return this._activeCamera;
  }

  get activeCameraName() {
    return this._activeCameraName;
  }

  add(name, camera) {
    this.cameras[name] = camera;
  }

  remove(name) {
    delete this.cameras[name];
  }
}

export default CameraManager;
