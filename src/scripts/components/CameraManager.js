import GLOBAL_RESIZE from "../common/resize";

export const CONSTANTS = {
  fov: 50,
  aspect: GLOBAL_RESIZE.width / GLOBAL_RESIZE.height,
  near: 0.1,
  far: 700
};

/**
 * @class
 * @classdesc
 * The Camera Manager handles which camera is active.
 * It also keeps track of all camera instances.
 *
 * @since 0.0.1
 *
 */
class CameraManager {
  constructor() {
    /**
     * @since 0.0.1
     *
     * @type {object<Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera>}
     */
    this._cameras = {};

    /**
     *
     * @since 0.0.1
     *
     * @type {string}
     * @private
     */
    this._activeCameraName = '';
  }

  /**
   * Get an object of all camera's managed by this instance.
   * @since 0.0.1
   *
   * @return {Object<Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera>}
   */
  get cameras() {
    return this._cameras;
  }

  /**
   * Set the active camera instance.
   * @since 0.0.1
   *
   * @param {String} key The key of the camera to set active.
   */
  set activeCamera(key) {
    this._activeCamera = this._cameras[key];
    this._activeCameraName = key;
  }

  /**
   * Get the current active camera instance.
   * @since 0.0.1
   *
   * @return {Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera}
   */
  get activeCamera() {
    return this._activeCamera;
  }

  /**
   * Get the key of the current active camera.
   * @since 0.0.1
   *
   * @returns {string}
   */
  get activeCameraName() {
    return this._activeCameraName;
  }

  /**
   * Add a camera to the manager.
   *
   * @since 0.0.1
   *
   * @param {string} key The unique key of your camera.
   * @param {Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera} camera The camera instance.
   */
  add(key, camera) {
    if (!this._cameras.hasOwnProperty(key)) {
      this._cameras[key] = camera;
    }
  }

  /**
   * @since 0.0.1
   *
   * @param {string} key The unique key of the camera you wish to remove.
   */
  remove(key) {
    delete this.cameras[key];
  }
}

export default CameraManager;
