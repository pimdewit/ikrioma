import '../styles/main.scss';

import loop from 'raf-loop';
import { Scene, DirectionalLight } from 'three';

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

const MODELS = {
  ROBOTS: 1,
};

/**
 * Ikrioma.
 * @author Pim de Wit <https://pdw.io>
 */
class Ikrioma {

  constructor(canvas) {
    this.camera = camera;
    this.scene = new Scene();

    this.controls = new Controls(100);
    RENDER_TARGETS.push(this.controls);

    this.camera.position.setY(10);
    this.camera.position.setZ(-100);

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

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this._renderer.engine.setSize(width, height);

    this.render();
  }

  _onPointerMove(event) {
    const coordinates = getPointerCoordinates(event);
  }

  _animate() {}

  render() {
    animateComponents();


    RENDER_TARGETS.forEach(target => {
      const objectPosition = target.position;

      if (!objectPosition) return;

      const distance = this.camera.position.distanceTo(objectPosition);

      if (distance <= LOD.CLOSE) {
        target.quality = 'high';
      } else if (distance > LOD.CLOSE && distance <= LOD.MEDIUM) {
        target.quality = 'medium';
      } else if (distance > LOD.MEDIUM) {
        target.quality = 'low';
      }
    });

    this._renderer.engine.render(this.scene, this.camera);
  }
}

const Experiment = new Ikrioma(document.querySelector('[ikrioma-canvas]'));

Experiment.looping = true;
