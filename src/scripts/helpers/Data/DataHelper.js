import '../../../styles/components/_datahelper.scss';

const CONSTANTS = {
  CLASS_ACTIVE: 'active',
  CLASS_LISTITEM: 'fragment',
  ATTRIBUTE_PARENT: 'ikrioma-helpers',
  ATTRIBUTE_CONTAINER: 'ikrioma-helper-data'
};

class DataHelper {
  constructor() {
    this._container = document.createElement('div');
    this._container.setAttribute(CONSTANTS.ATTRIBUTE_CONTAINER, '');

    this.active = true;

    /* This element nor its contents should not be read by the browser */
    this._container.setAttribute('aria-hidden', '');


    this.textElements = [];

    /** TODO: find better way to distribute root element globally */
    this.parentContainer.appendChild(this._container);
  }

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

  get parentContainer() {
    return document.querySelector(`[${CONSTANTS.ATTRIBUTE_PARENT}]`);
  }

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
