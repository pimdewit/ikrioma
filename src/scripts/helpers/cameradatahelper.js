import './scenedata.scss';

import {trimDecimals} from '../common/common';

const CONSTANTS = {
  CLASS_ACTIVE: 'active',
  CLASS_LISTITEM: 'fragment',
  ATTRIBUTE_CONTAINER: 'ikrioma-scene-data'
};

class CameraDataHelper {

  constructor(cameramanager) {
    this._data = cameramanager;

    console.log(this._data);
    this._container = document.createElement('div');
    this._container.setAttribute(CONSTANTS.ATTRIBUTE_CONTAINER, '');

    this.active = true;

    /* This element nor its contents should not be read by the browser */
    this._container.setAttribute('aria-hidden', true);


    this.textElements = [];

    Object.keys(this.managerData).forEach(key => {
      const element = document.createElement('code');
      element.classList.add(CONSTANTS.CLASS_LISTITEM, key);
      const textNode = document.createTextNode(key);
      this.textElements.push(element);

      element.appendChild(textNode);
      this._container.appendChild(element);
    });

    /** TODO: find better way to distribute root element globally */
    document.querySelector('[ikrioma-helpers]').appendChild(this._container);
  }

  get active() {
    return this._active;
  }

  set active(active) {
    this._active = active;

    if (active) {
      this._container.classList.add(CONSTANTS.CLASS_ACTIVE);
    } else {
      this._container.classList.remove(CONSTANTS.CLASS_ACTIVE);
    }
  }

  get managerData() {
    const activeCamera = this._data.activeCamera;
    const controls = activeCamera._Ikrioma ? activeCamera._Ikrioma.controls.constructor.name : 'N/A';
    const {x: pX, y: pY, z: pZ} = activeCamera.position;
    const {x: rX, y: rY, z: rZ} = activeCamera.rotation;
    // const {rotX, rotY, rotZ} = activeCamera.rotation;
    const object = {};
    object.cameraList = Object.keys(this._data.cameras).toString();
    object.activeCamera = this._data.activeCameraName;
    object.activePosition = `${trimDecimals(pX)}, ${trimDecimals(pY)}, ${trimDecimals(pZ)}`;
    object.activeRotation =  `${trimDecimals(rX)}, ${trimDecimals(rY)}, ${trimDecimals(rZ)}`;
    object.controlType = controls;
    return object;
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
