import '../styles/main.scss';

import loop from 'raf-loop';
import { Scene } from 'three';

import GLOBAL_RESIZE from './common/resize';
import { randomNumber } from './common/common';

import TetraHedron from './models/tetrahedron/tetrahedron';

import camera from './components/camera';
import { RENDER_TARGETS, Renderer, animateComponents } from './components/renderer';
import controls from './components/controls';

/**
 * Ikrioma.
 * @author Pim de Wit <https://pdw.io>
 */
class Ikrioma {

  constructor(canvas) {
    this.camera = camera;
    this.scene = new Scene();

    this.camera.position.setY(0);
    this.camera.position.setZ(-30);
    this.camera.lookAt(0, 0, 0);

    this._renderer = new Renderer(canvas);
    this.__resize = this._resize.bind(this);

    this._looping = false;
    this._engine = loop(this.render.bind(this));

    this.objects = [];

    const randomPosMax = 50;

    for (let i = 0; i < 50; i++) {
      const object = new TetraHedron(1, 1, {});
      object.position.set(randomNumber(10), randomNumber(10), randomNumber(10));

      this.objects.push(object);
      RENDER_TARGETS.push(object);

      this.scene.add(object);
    }

    this._addEventListeners();
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

  _animate() {}

  render() {
    animateComponents();

    this._renderer.engine.render(this.scene, this.camera);
  }
}

const Experiment = new Ikrioma(document.querySelector('[ikrioma-canvas]'));

Experiment.looping = true;
