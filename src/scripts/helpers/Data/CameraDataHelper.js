import {trimDecimals} from '../../Core/Math/trimDecimals';

import DataHelper from './DataHelper';

/**
 * @author Pim de Wit / https://pdw.io
 *
 * @class
 * @classdesc
 * Show info related to the active camera.
 *
 * @since 0.0.1
 * @extends {DataHelper}
 */
class CameraDataHelper extends DataHelper {
  constructor(cameraManager) {
    super();

    /**
     * The data source.
     *
     * @since 0.0.1
     * @private
     * @readonly
     *
     * @type {CameraManager}
     */
    this._data = cameraManager;

    this._createDOM(this.managerData);
  }

  /**
   * A stringified && rounded version of the data source.
   *
   * @memberOf CameraDataHelper
   * @since 0.0.1
   * @public
   * @readonly
   *
   * @type {object}
   * @returns {object<string>}
   */
  get managerData() {
    const activeCamera = this._data.activeCamera;
    const controls = activeCamera._Ikrioma ? activeCamera._Ikrioma.controls.constructor.name : 'N/A';

    const {x: pX, y: pY, z: pZ} = activeCamera.position;
    const {x: rX, y: rY, z: rZ} = activeCamera.rotation;

    return {
      cameraList: Object.keys(this._data.cameras).toString(),
      activeCamera: this._data.activeCameraName,
      activePosition: `${trimDecimals(pX, 2)}, ${trimDecimals(pY, 2)}, ${trimDecimals(pZ, 2)}`,
      activeRotation:  `${trimDecimals(rX, 2)}, ${trimDecimals(rY, 2)}, ${trimDecimals(rZ, 2)}`,
      controlType: controls
    };
  }

  /**
   * Render the processed data to display into its own assigned DOM elements.
   *
   * @memberOf CameraDataHelper
   * @since 0.0.1
   * @public
   */
  render() {
    if (!this._active) return;

    const data = this.managerData;
    const keys = Object.keys(data);

    this.textElements.forEach((element, index) => {
      const key = keys[index];
      element.textContent = `${key}: ${data[key]}`;
    });
  }
}

export default CameraDataHelper;
