import '../styles/main.scss';

import {IcosahedronBufferGeometry, LOD, PerspectiveCamera, Scene} from 'three';

import GLOBAL_RESIZE from './common/resize';

import TestSphere from './scene/models/TestSphere/TestSphere';

import {RENDER_TARGETS, Renderer} from './components/Renderer';
import CameraManager, {CONSTANTS as CAMERA_CONSTANTS} from './components/CameraManager';
import SceneDataHelper from './helpers/Data/SceneDataHelper';
import CameraDataHelper from './helpers/Data/CameraDataHelper';
import OrbitControls from './third_party/OrbitControls';
import GlobalLight from './scene/environment/GlobalLight';
import Ground from './scene/environment/Ground';
import {randomNumber} from "./common/common";

import { DEFAULTS } from './scene/models/constants';

const SPHERE_COUNT = 10;
const SPHERE_POS_RANDOMNESS = 3;
const SHADOW_SIZE = 32; // higher is less accurate
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


//typeof render === function = 1.8ms

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

    this.cameraManager = new CameraManager();

    this.__temp__LODObjects = [];

    this.__temp__addEnvironment();
    this.__temp__createCamera();
    this.__temp__createLODModels();

    this._addEventListeners();
    // this.__temp__createHelpers();
  }

  set looping(loop) {
    this.active = loop;

    if (loop) {
      this.render();
    }
  }

  _addEventListeners() {
    GLOBAL_RESIZE.addListener(this.__resize);
    this._renderer.canvas.addEventListener('pointermove', this.__onPointerMove);
  }

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

  __temp__addEnvironment() {
    this.ground = new Ground();

    this.ground.position.setY(-10);
    this.ground.updateMatrix();

    this._scene.add(this.ground);

    this.light = new GlobalLight();
    this.light.shadow = SHADOW_SIZE;
    this._scene.add(this.light);
  }

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

  __temp__createLODModels() {
    const mat1 = DEFAULTS.MATERIAL;
    const mat2 = DEFAULTS.MATERIAL_TWO;

    const meshInfo = [
      [ new IcosahedronBufferGeometry( 1, 4 ), mat1, 1 ],
      [ new IcosahedronBufferGeometry( 1, 3 ), mat2, 10 ],
      [ new IcosahedronBufferGeometry( 1, 2 ), mat1, 20 ],
      [ new IcosahedronBufferGeometry( 1, 1 ), mat2, 30 ],
      [ new IcosahedronBufferGeometry( 1, 0 ), mat1, 40 ]
    ];

    for (let j = 0; j < SPHERE_COUNT; j++) {
      const lod = new TestSphere(meshInfo);
      lod.position.set(randomNumber(SPHERE_POS_RANDOMNESS), randomNumber(SPHERE_POS_RANDOMNESS), randomNumber(SPHERE_POS_RANDOMNESS));

      // lod.debug = true;
      // this._scene.add(lod.debugMesh);

      this.__temp__LODObjects.push(lod);

      RENDER_TARGETS.push(lod);
      this._scene.add(lod);
    }
  }

  __temp__createHelpers() {
    this.cameraHelper = new CameraDataHelper(this.cameraManager);
    RENDER_TARGETS.push(this.cameraHelper);
    this.sceneHelper = new SceneDataHelper(this._renderer);
    RENDER_TARGETS.push(this.sceneHelper);
  }

  __temp__loop__DrawModels() {
    let i = this.__temp__LODObjects.length - 1;

    for (i; i >= 0; i--) {
      this.__temp__LODObjects[i].update(this.cameraManager.activeCamera);
    }
  }

  __temp__loop__DrawMicroComponents() {
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

  __temp__interpolation(start, end, alpha) {
    return start * (1 - alpha) + end * alpha;
  }

  render() {
    const renderer = this._renderer.engine;
    const camera = this.cameraManager.activeCamera;

    this.__temp__loop__DrawModels();
    this.__temp__loop__DrawMicroComponents();

    // If the camera contains controls, update it.
    if (camera._Ikrioma && camera._Ikrioma.controls) camera._Ikrioma.controls.update();

    if ( camera.position.y < 0) {
      camera.position.y = this.__temp__interpolation(camera.position.y, 0, 0.01);
    }

    // renderer.setViewport(0, 0, this._width, this._height);

    renderer.render(this._scene, camera);

    // this.__temp__loop__secondViewport();

    if (this.active) requestAnimationFrame(this.render.bind(this));
  }
}

const canvas = document.querySelector('[ikrioma-canvas]');
const Experiment = new Ikrioma(canvas);

Experiment.looping = true;
