import GLOBAL_RESIZE from '../common/resize';
import { WebGLRenderer } from 'three';

/** @type {Array<Object>} */
export const RENDER_TARGETS = [];

/**
 * A List of reference for this script.
 * @type {Object}
 * @constant
 */
const CONSTANTS = {
  ALPHA_TRANSPARENT: 0,
  ALPHA_SOLID: 1,
  POWER_HIGH: 'high-performance',
  POWER_LOW: 'low-power'
};

/**
 * Default settings for the renderer.
 * @param {Boolean} ANTI_ALIAS Whether to perform antialiasing.
 * @param {String} POWER_PREFERENCE "high-performance", "low-power" or "default".
 * @param {String} CLEAR_COLOR Colour to display as background.
 * @param {Number} CLEAR_ALPHA Alpha of the background.
 */
const DEFAULTS = {
  ANTI_ALIAS: true,
  POWER_PREFERENCE: CONSTANTS.POWER_HIGH,
  CLEAR_COLOR: 0xf2f3f4,
  CLEAR_ALPHA: CONSTANTS.ALPHA_TRANSPARENT
};

/**
 * @param {HTMLCanvasElement} canvas The canvas to draw to.
 * @param {Object} [config]
 * @param {Boolean} [config.antialias] Whether to perform antialiasing.
 * @param {String} [config.POWER_PREFERENCE] https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.2.1
 * @param {String} [config.CLEAR_COLOR] Colour to display as background.
 * @param {Number} [config.CLEAR_ALPHA] Alpha of the background.
 * @class
 */
export class Renderer {
  constructor(canvas, config = DEFAULTS) {

    this._renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: config.ANTI_ALIAS,
      powerPreference: config.POWER_PREFERENCE,
      alpha: config.CLEAR_ALPHA === CONSTANTS.ALPHA_TRANSPARENT
    });

    this._renderer.setClearColor(config.CLEAR_COLOR, config.CLEAR_ALPHA);

    this.size = {
      width: GLOBAL_RESIZE.width,
      height: GLOBAL_RESIZE.height
    };
  }

  /**
   * Set the viewport width/height
   * @param {Object} size
   * @param {Number} size.width
   * @param {Number} size.height
   */
  set size(size) {
    this._renderer.setSize(size.width, size.height);
  }

  get engine() {
    return this._renderer;
  }

  /**
   * Get the renderer canvas
   * @returns {HTMLCanvasElement}
   */
  get canvas() {
    return this._renderer.domElement;
  }
}

/**
 * Render the "render()" methods of an array of classes.
 */
export function animateComponents() {
  RENDER_TARGETS.forEach(target => {
    if (typeof target.render === 'function') {
      target.render();
    } else {
      console.warn(`%c${target.constructor.name}`, 'font-weight: bold', `does not have a render() method.`);
      console.warn(`Removing target from render targets array.`);
      RENDER_TARGETS.splice(target, 1);
    }
  });
}
