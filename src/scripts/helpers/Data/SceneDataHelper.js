import DataHelper from './DataHelper';

/**
 * Take the Scene renderer and extract info from it.
 */

/**
 * @author Pim de Wit / https://pdw.io
 *
 * @class
 * @classdesc
 * Take the Scene renderer and extract info from it, then display it in HTML elements.
 *
 * @since 0.0.1
 * @extends {DataHelper}
 */
class SceneDataHelper extends DataHelper {
  constructor(renderer) {
    super();

    /**
     * The data source.
     *
     * @since 0.0.1
     * @private
     * @readonly
     *
     * @type {Renderer}
     */
    this._renderer = renderer;

    this._createDOM(this.sceneData);
  }

  /**
   * A simple shorthand to the class' data object.
   *
   * @memberOf SceneDataHelper
   * @since 0.0.1
   * @public
   * @readonly
   *
   * @type {object}
   * @returns {object<string>}
   */
  get sceneData() {
    return this._renderer.engine.info.render;
  }

  /**
   * Render the processed data to display into its own assigned DOM elements.
   *
   * @memberOf CameraDataHelper
   * @since 0.0.1
   * @public
   */
  render() {
    if (!this._active) return;

    const data = this.sceneData;
    const keys = Object.keys(data);

    this.textElements.forEach((element, index) => {
      const key = keys[index];
      element.textContent = `${key}: ${data[key]}`;
    });
  }
}

export default SceneDataHelper;
