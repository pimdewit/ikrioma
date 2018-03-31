import {trimDecimals} from '../../common/common';

import DataHelper from './DataHelper';

/**
 * Show info related to the active camera.
 * @extends {DataHelper}
 */
class CameraDataHelper extends DataHelper {
  constructor(cameraManager) {
    super();
    this._data = cameraManager;

    this._createDOM(this.managerData);
  }

  get managerData() {
    const activeCamera = this._data.activeCamera;
    const controls = activeCamera._Ikrioma ? activeCamera._Ikrioma.controls.constructor.name : 'N/A';

    const {x: pX, y: pY, z: pZ} = activeCamera.position;
    const {x: rX, y: rY, z: rZ} = activeCamera.rotation;

    return {
      cameraList: Object.keys(this._data.cameras).toString(),
      activeCamera: this._data.activeCameraName,
      activePosition: `${trimDecimals(pX)}, ${trimDecimals(pY)}, ${trimDecimals(pZ)}`,
      activeRotation:  `${trimDecimals(rX)}, ${trimDecimals(rY)}, ${trimDecimals(rZ)}`,
      controlType: controls
    };
  }

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
