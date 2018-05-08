import GLOBAL_RESIZE from "../Core/DOM/resize";

export const CONSTANTS = {
  fov: 50,
  aspect: GLOBAL_RESIZE.width / GLOBAL_RESIZE.height,
  near: 0.1,
  far: 700
};

/**
 * @author Pim de Wit / https://pdw.io
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
     * Will contain all the cameras.
     *
     * @since 0.0.1
     *
     * @type {Object<Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera>}
     */
    this._cameras = {};
  }

  /**
   * Get an object of all camera's managed by this instance.
   *
   * @since 0.0.1
   *
   * @return {object<Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera>}
   */
  get cameras() {
    return this._cameras;
  }

  /**
   * Set the active camera instance.
   *
   * @since 0.0.1
   *
   * @param {String} key The key of the camera to set active.
   */
  set activeCamera(key) {
    this._activeCamera = this._cameras[key];
  }

  /**
   * Get the current active camera instance.
   *
   * @since 0.0.1
   *
   * @return {Camera|PerspectiveCamera|OrthographicCamera|CubeCamera|StereoCamera}
   */
  get activeCamera() {
    return this._activeCamera;
  }

  /**
   * Get the key of the current active camera.
   *
   * @since 0.0.1
   *
   * @returns {string}
   */
  get activeCameraName() {
    return this.activeCamera._Ikrioma.id;
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

      if (typeof camera._Ikrioma === 'undefined') {
        camera._Ikrioma = {};
      }

      camera._Ikrioma.id = key;
      camera._Ikrioma.active = false;

      this._cameras[key] = camera;
    }
  }

  /**
   * Remove a camera from the manager.
   *
   * @since 0.0.1
   *
   * @param {string} key The unique key of the camera you wish to remove.
   */
  remove(key) {
    delete this.cameras[key];
  }
}

export default CameraManager;
