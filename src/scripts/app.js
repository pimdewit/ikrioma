import '../styles/main.scss';

import loop from 'raf-loop';

import { Scene, PerspectiveCamera, IcosahedronBufferGeometry, LOD } from 'three';

import GLOBAL_RESIZE from './common/resize';

import TestSphere from './scene/models/tetrahedron/tetrahedron';

import { RENDER_TARGETS, Renderer } from './components/Renderer';
import CameraManager, {CONSTANTS as CAMERA_CONSTANTS} from './components/CameraManager';
import SceneDataHelper from './helpers/Data/SceneDataHelper';
import CameraDataHelper from './helpers/Data/CameraDataHelper';
import OrbitControls from './third_party/OrbitControls';
import GlobalLight from './scene/environment/GlobalLight';
import Ground from './scene/environment/Ground';
import {randomNumber} from "./common/common";

const SPHERE_COUNT = 50;
const SHADOW_SIZE = 1280; // higher is less accurate
const SECOND_VIEWPORT_PADDING = 16;

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
    distance: 20
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

    this._width = 0;
    this._height = 0;

    this.__resize = this._resize.bind(this);
    this._engine = loop(this.render.bind(this));

    this.cameraManager = new CameraManager();

    this.__temp__addEnvironment();
    this.__temp__createCamera();
    this.__temp__createLODModels();

    this._addEventListeners();
    // this._addHelpers();
  }

  /** Environment */
  __temp__addEnvironment() {
    this.ground = new Ground();
    this.ground.position.setY(-10);
    this._scene.add(this.ground);

    this.light = new GlobalLight();
    this.light.shadow = SHADOW_SIZE;
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
      [ new IcosahedronBufferGeometry( 1, 4 ), 1 ],
      [ new IcosahedronBufferGeometry( 1, 3 ), 10 ],
      [ new IcosahedronBufferGeometry( 1, 2 ), 20 ],
      [ new IcosahedronBufferGeometry( 1, 1 ), 30 ],
      [ new IcosahedronBufferGeometry( 1, 0 ), 40 ]
    ];

    for ( let j = 0; j < SPHERE_COUNT; j ++ ) {
      const lod = new TestSphere(geometry);
      lod.position.set(randomNumber(10), randomNumber(10), randomNumber(10));

      lod.debug = true;
      this._scene.add(lod.debugMesh);

      // RENDER_TARGETS.push(lod);
      this._scene.add(lod);
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
    this._width = GLOBAL_RESIZE.width;
    this._height = GLOBAL_RESIZE.height;

    this._renderer.size = {width: this._width, height: this._height};

    // Get the width and height from the canvas since it contains pixel density.
    const renderWidth = this._renderer.engine.domElement.width;
    const renderHeight = this._renderer.engine.domElement.height;


    this.cameraManager.activeCamera.aspect = renderWidth / renderHeight;
    this.cameraManager.activeCamera.updateProjectionMatrix();

    this._secondViewport = {
      width: renderWidth / 5,
      height: renderHeight / 5
    };


    this.render();
  }

  /**
   * Drawing loop which specifically handles models/meshes in particular.
   * @private
   */
  _drawModels() {
    // If the scene contains LOD objects, update it.
    this._scene.traverse(model => {
      if (model instanceof LOD) {
        model.update(this.cameraManager.activeCamera);
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
    const renderer = this._renderer.engine;
    const camera = this.cameraManager.activeCamera;

    this._drawModels();
    this._drawMicroComponents();

    // If the camera contains controls, update it.
    if (camera._Ikrioma && camera._Ikrioma.controls) camera._Ikrioma.controls.update();

    renderer.setViewport(0, 0, this._width, this._height);

    renderer.render(this._scene, camera);

    // this.__temp__loop__secondViewport();
  }

  __temp__loop__secondViewport() {
    const renderer = this._renderer.engine;
    const { 'back': camera } = this.cameraManager.cameras;
    const p = SECOND_VIEWPORT_PADDING;
    const vp2 = this._secondViewport;
    renderer.clearDepth();
    renderer.setScissorTest(true);
    renderer.setScissor(p, this._height - vp2.height - p, vp2.width, vp2.height);
    renderer.setViewport(p, this._height - vp2.height - p, vp2.width, vp2.height);
    renderer.render(this._scene, camera);
    renderer.setScissorTest(false);
  }
}

const canvas = document.querySelector('[ikrioma-canvas]');
const Experiment = new Ikrioma(canvas);

Experiment.looping = true;
