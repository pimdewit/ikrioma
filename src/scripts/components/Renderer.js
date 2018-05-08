import GLOBAL_RESIZE from '../Core/DOM/resize';
import { WebGLRenderer, PCFShadowMap, PCFSoftShadowMap } from 'three';

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
  POWER_LOW: 'low-power',
  SHADOW_TYPE_REGULAR: PCFShadowMap,
  SHADOW_TYPE_SOFT: PCFSoftShadowMap,
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
  POWER_PREFERENCE: CONSTANTS.POWER_LOW,
  CLEAR_COLOR: 0xf2f3f4,
  CLEAR_ALPHA: CONSTANTS.ALPHA_TRANSPARENT,
  SHADOW: CONSTANTS.SHADOW_TYPE_SOFT
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

    const width = GLOBAL_RESIZE.width;
    const height = GLOBAL_RESIZE.height;

    this._renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: config.ANTI_ALIAS,
      // depth: false,
      powerPreference: config.POWER_PREFERENCE,
      alpha: config.CLEAR_ALPHA === CONSTANTS.ALPHA_TRANSPARENT
    });

    this._renderer.setPixelRatio(window.devicePixelRatio);

    this._renderer.gammaInput = true;
    this._renderer.gammaOutput = true;
    this._renderer.shadowMap.enabled = true;
    this._renderer.shadowMap.type = DEFAULTS.SHADOW;
    this._renderer.shadowMap.autoUpdate = true;

    this._renderer.setClearColor(config.CLEAR_COLOR, config.CLEAR_ALPHA);

    this.size = {
      width: width,
      height: height
    };

    /**
     * Array of classes to loop through
     * @type {Array}
     * @private
     */
    this._targets = [];
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

  /** @returns {WebGLRenderer} */
  get engine() {
    return this._renderer;
  }

  /** @returns {HTMLCanvasElement} */
  get canvas() {
    return this._renderer.domElement;
  }

  /**
   * Get all render targets.
   * @returns {Array<Object>}
   */
  get targets() {
    return this._targets;
  }

  set shadowMap(shadowMap) {
    this._renderer.shadowMap.enabled = shadowMap;
  }

  /**
   * @param {Object} target
   */
  add(target) {
    this._targets.push(target);
  }

  /**
   * Remove an item from the targets array.
   * @param {Object} target
   */
  remove(target) {
    this._targets.splice(target, 1);
  }
}
