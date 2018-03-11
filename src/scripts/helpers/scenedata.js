import './scenedata.scss';

const CONSTANTS = {
  CLASS_ACTIVE: 'active',
  CLASS_LISTITEM: 'fragment',
  ATTRIBUTE_CONTAINER: 'ikrioma-scene-data'
};

class SceneDataHelper {
  constructor(renderer) {
    this._renderer = renderer;
    this._container = document.createElement('aside');
    this._container.setAttribute(CONSTANTS.ATTRIBUTE_CONTAINER, '');

    this.active = true;

    /* This element nor its contents should not be read by the browser */
    this._container.setAttribute('aria-hidden', true);


    this.textElements = [];

    Object.keys(this.sceneData).forEach(key => {
      const element = document.createElement('code');
      element.classList.add(CONSTANTS.CLASS_LISTITEM, key);
      const textNode = document.createTextNode(key);
      this.textElements.push(element);

      element.appendChild(textNode);
      this._container.appendChild(element);
    });

    /** TODO: find better way to distribute root element globally */
    document.querySelector('[ikrioma-root]').appendChild(this._container);
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

  get sceneData() {
    return this._renderer.engine.info.render;
  }

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
