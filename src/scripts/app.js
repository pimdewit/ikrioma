import '../styles/main.scss';

import loop from 'raf-loop';
import { Scene } from 'three';


import GLOBAL_RESIZE from './common/resize';

import TetraHedron from './models/tetrahedron/tetrahedron';

import camera from './components/camera';
import { RENDER_TARGETS, Renderer, animateComponents } from './components/renderer';
import controls from './components/controls';

class Ikrioma {
  constructor(canvas) {

    this.camera = camera;
    this.scene = new Scene();

    this.camera.position.setY(0);
    this.camera.position.setZ(-30);
    this.camera.lookAt(0, 0, 0);

    this._renderer = new Renderer(canvas);
    this.__resize = this._resize.bind(this);

    this._loop = false;
    this._engine = loop(this.render.bind(this));

    this.object = new TetraHedron(3, {});

    this.scene.add(this.object);

    this._addEventListeners();
  }

  set loop(loop) {
    this._loop = loop;

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
    console.groupCollapsed('Resized window');
    console.log(`w: ${GLOBAL_RESIZE.width} h: ${GLOBAL_RESIZE.height}`);
    console.groupEnd();

    this.render();
  }

  _animate() {}

  render() {
    this.object.rotation.x += 0.01;
    animateComponents();

    this._renderer.engine.render(this.scene, this.camera);
  }
}

const Experiment = new Ikrioma(document.querySelector('[ikrioma-canvas]'));

Experiment.loop = true;
