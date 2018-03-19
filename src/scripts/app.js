import '../styles/main.scss';

import loop from 'raf-loop';

import { Scene, PerspectiveCamera, DirectionalLight } from 'three';

import GLOBAL_RESIZE from './common/resize';
import { randomNumber, getPointerCoordinates } from './common/common';

import TetraHedron from './models/tetrahedron/tetrahedron';

import camera from './components/camera';
import { RENDER_TARGETS, Renderer, animateComponents } from './components/renderer';
import Controls from './components/controls';
import SceneDataHelper from "./helpers/scenedata";

const LOD = {
  CLOSE: 10,
  MEDIUM: 20,
  FAR: 20
};
import CameraManager, {CONSTANTS as CAMERA_CONSTANTS} from './components/cameraManager';
import SceneDataHelper from './helpers/scenedata';
import CameraDataHelper from './helpers/cameradatahelper';
import OrbitControls from './third_party/OrbitControls';

const MODELS = {
  ROBOTS: 1,
};

const CAMERA_DATA = [
  {
    id: 'front',
    options: {
      fov: 50,
      aspect: GLOBAL_RESIZE.width / GLOBAL_RESIZE.height,
      near: 0.1,
      far: 800
    },
    controls: true,
    distance: 100
  },
  {
    id: 'back',
    options: {
      fov: 50,
      aspect: GLOBAL_RESIZE.width / GLOBAL_RESIZE.height,
      near: 0.1,
      far: 800
    },
    controls: true,
    distance: 200
  }
];

/**
 * Ikrioma.
 * @author Pim de Wit <https://pdw.io>
 */
class Ikrioma {

  constructor(canvas) {
    this.scene = new Scene();

    this.cameraManager = new CameraManager();

    CAMERA_DATA.forEach(data => {
      const {id, controls, distance} = data;
      const {fov, aspect, near, far} = data.options || CAMERA_CONSTANTS;

      const camera = new PerspectiveCamera(fov, aspect, near, far);

      if (controls) {
        const orbitControls = new OrbitControls(camera, {
          element: canvas,
          parent: canvas,
          distance: distance
        });
        camera._Ikrioma = {
          controls: orbitControls
        };
      } else {
        camera.position.setZ(distance);
      }

      this.cameraManager.add(id, camera);
      this.scene.add(camera);

    });

    this.cameraManager.activeCamera = 'front';

    setTimeout(() => {
      this.cameraManager.activeCamera = 'back';
    }, 5000);

    this._renderer = new Renderer(canvas);

    this.__resize = this._resize.bind(this);
    this.__onPointerMove = this._onPointerMove.bind(this);

    this._looping = false;
    this._engine = loop(this.render.bind(this));

    this.objects = [];

    for (let i = 0; i < MODELS.ROBOTS; i++) {
      const object = new TetraHedron(1, 1, {});
      // object.position.set(randomNumber(200), -1, randomNumber(10));
      object.position.set(0, -1, 0);

      this.objects.push(object);
      RENDER_TARGETS.push(object);

      this.scene.add(object);
    }

    this.light = new DirectionalLight(0xffffff, 1);
    this.light.position.set(0, 0, -100);

    this.scene.add(this.light);

    this._addEventListeners();

    this.cameraHelper = new CameraDataHelper(this.cameraManager);
    RENDER_TARGETS.push(this.cameraHelper);
    this.sceneHelper = new SceneDataHelper(this._renderer);
    RENDER_TARGETS.push(this.sceneHelper);
  }

  set looping(loop) {
    this._looping = loop;

    loop ? this._engine.start() : this._engine.stop();
  }

  /**
   * Add event listeners.
   * @private
   */
  _addEventListeners() {
    GLOBAL_RESIZE.addListener(this.__resize);
    this._renderer.canvas.addEventListener('pointermove', this.__onPointerMove);
  }

  /**
   * Remove event listeners.
   * @private
   */
  _removeEventListeners() {
    GLOBAL_RESIZE.removeListener(this.__resize);
  }

  /**
   * Resize handler,
   * @private
   */
  _resize() {
    const width = GLOBAL_RESIZE.width;
    const height = GLOBAL_RESIZE.height;

    this.cameraManager.activeCamera.aspect = width / height;
    this.cameraManager.activeCamera.updateProjectionMatrix();

    this._renderer.engine.setSize(width, height);

    this.render();
  }

  _onPointerMove(event) {
    const coordinates = getPointerCoordinates(event);
  }

  _animate() {}

  render() {
    animateComponents();

    if (this.cameraManager.activeCamera._Ikrioma) this.cameraManager.activeCamera._Ikrioma.controls.update();
    this._renderer.engine.render(this.scene, this.cameraManager.activeCamera);
  }
}

const canvas = document.querySelector('[ikrioma-canvas]');
const Experiment = new Ikrioma(canvas);

Experiment.looping = true;
