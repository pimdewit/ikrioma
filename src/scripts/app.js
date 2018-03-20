import '../styles/main.scss';

import loop from 'raf-loop';

import { Scene, PerspectiveCamera, DirectionalLight, IcosahedronGeometry, LOD } from 'three';

import GLOBAL_RESIZE from './common/resize';

import TetraHedron from './models/tetrahedron/tetrahedron';

import { RENDER_TARGETS, Renderer, animateComponents } from './components/renderer';
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
      fov: 20,
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
    controls: false,
    distance: 200
  }
];

/**
 * Ikrioma.
 * @author Pim de Wit <https://pdw.io>
 */
class Ikrioma {

  constructor(canvas) {
    this._scene = new Scene();
    this._renderer = new Renderer(canvas);
    this.__resize = this._resize.bind(this);
    this._engine = loop(this.render.bind(this));

    this.cameraManager = new CameraManager();

    this.__temp__addLight();
    this.__temp__createCamera();
    this.__temp__createLODModels();
    this.__temp__createModels();

    this._addEventListeners();
    this._addHelpers();
  }

  /** Lights */
  __temp__addLight() {
    this.light = new DirectionalLight(0xffffff, 1);
    this.light.position.set(0, 0, -100);

    this._scene.add(this.light);
  }

  /** Camera */
  __temp__createCamera() {
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
      this._scene.add(camera);

    });

    this.cameraManager.activeCamera = 'front';
  }

  /** Secondary models. */
  __temp__createLODModels() {
    const geometry = [
      [ new IcosahedronGeometry( 1, 4 ), 1 ],
      [ new IcosahedronGeometry( 1, 3 ), 10 ],
      [ new IcosahedronGeometry( 1, 2 ), 20 ],
      [ new IcosahedronGeometry( 1, 1 ), 30 ],
      [ new IcosahedronGeometry( 1, 0 ), 40 ]
    ];

    for ( let j = 0; j < 1; j ++ ) {
      const lod = new TetraHedron(geometry);
      this._scene.add(lod);
    }
  }

  /** Important models. */
  __temp__createModels() {
    for (let i = 0; i < MODELS.ROBOTS; i++) {
      const object = new TetraHedron(1, 1, {});
      object.position.set(0, -1, 0);

      RENDER_TARGETS.push(object);
      this._scene.add(object);
    }
  }

  set looping(loop) {
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

  _addHelpers() {
    this.cameraHelper = new CameraDataHelper(this.cameraManager);
    RENDER_TARGETS.push(this.cameraHelper);
    this.sceneHelper = new SceneDataHelper(this._renderer);
    RENDER_TARGETS.push(this.sceneHelper);
  }

  /**
   * Resize handler.
   * @private
   */
  _resize() {
    const width = GLOBAL_RESIZE.width;
    const height = GLOBAL_RESIZE.height;

    this.cameraManager.activeCamera.aspect = width / height;
    this.cameraManager.activeCamera.updateProjectionMatrix();

    this._renderer.size = {width: width, height: height};

    this.render();
  }

  /**
   * Drawing loop which specifically handles models/meshes in particular.
   * @private
   */
  _drawModels() {
    // If the scene contains LOD objects, update it.
    this._scene.traverse(object => {
      if (object instanceof LOD) {
        object.update(this.cameraManager.activeCamera);
      }
    });
  }

  /**
   * Draw the logic for small components that are not as important as the main models.
   * @private
   */
  _drawMicroComponents() {
    let i = RENDER_TARGETS.length - 1;

    for (i; i >= 0; i--) {
      const target = RENDER_TARGETS[i];
      if (typeof target.render === 'function') {
        target.render();
      } else {
        console.warn(`%c${target.constructor.name}`, 'font-weight: bold', `does not have a render() method.`);
        console.warn(`Removing target from render targets array.`);
        target.splice(target, 1);
      }
    }
  }

  render() {
    const camera = this.cameraManager.activeCamera;

    this._drawModels();
    this._drawMicroComponents();

    // If the camera contains controls, update it.
    if (camera._Ikrioma) camera._Ikrioma.controls.update();

    this._renderer.engine.render(this._scene, camera);
  }
}

const canvas = document.querySelector('[ikrioma-canvas]');
const Experiment = new Ikrioma(canvas);

Experiment.looping = true;
