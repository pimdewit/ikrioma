import '../../../styles/components/_datahelper.scss';

const CONSTANTS = {
  CLASS_ACTIVE: 'active',
  CLASS_LISTITEM: 'fragment',
  ATTRIBUTE_PARENT: 'ikrioma-helpers',
  ATTRIBUTE_CONTAINER: 'ikrioma-helper-data'
};


/**
 * @author Pim de Wit <https://pdw.io>
 *
 * @class
 * @classdesc
 * Parse info from a source, and display it in a HTMLElement
 *
 * @since 0.0.1
 */
class DataHelper {
  constructor() {

    /**
     * Wrapping element that will contain nodes with the data to display.
     *
     * @since 0.0.1
     *
     * @type {HTMLDivElement}
     * @private
     */
    this._container = document.createElement('div');
    this._container.setAttribute(CONSTANTS.ATTRIBUTE_CONTAINER, '');


    /**
     * Whether the instance should be listening for changes on the specified data source.
     *
     * @since 0.0.1
     *
     * @type {boolean}
     */
    this.active = true;

    /* This element nor its contents should not be read by the browser */
    this._container.setAttribute('aria-hidden', '');


    /**
     * A collection of nodes displaying info about the data source.
     *
     * @since 0.0.1
     *
     * @type {Array}
     */
    this.textElements = [];

    /** TODO: find better way to distribute root element globally */
    this.parentContainer.appendChild(this._container);
  }

  /**
   * Create the needed DOM to properly display the data.
   *
   * @memberOf DataHelper
   * @since 0.0.1
   * @private
   *
   * @param {object} data The data source.
   */
  _createDOM(data) {
    Object.keys(data).forEach(key => {
      const element = document.createElement('code');
      element.classList.add(CONSTANTS.CLASS_LISTITEM, key);
      const textNode = document.createTextNode(key);
      this.textElements.push(element);

      element.appendChild(textNode);
      this._container.appendChild(element);
    });
  }

  /**
   * Get the parent DOM node of this instance's data collection.
   *
   * @memberOf DataHelper
   * @since 0.0.1
   * @public
   * @readonly
   *
   * @returns {Element | null}
   */
  get parentContainer() {
    return document.querySelector(`[${CONSTANTS.ATTRIBUTE_PARENT}]`);
  }

  /**
   * Whether this instance is active.
   *
   * @memberOf DataHelper
   * @since 0.0.1
   * @public
   * @readonly
   *
   * @returns {boolean}
   */
  get active() {
    return this._active;
  }

  set active(active) {
    this._active = active;

    if (active) {
      this._container.classList.add(CONSTANTS.CLASS_ACTIVE);
    } else {
      this._container.classList.remove(CONSTANTS.CLASS_ACTIVE);
    }
  }
}

export default DataHelper;
