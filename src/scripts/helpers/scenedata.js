import './scenedata.scss';

import DataHelper from './dataHelper';

class SceneDataHelper extends DataHelper {
  constructor(renderer) {
    super();
    this._renderer = renderer;

    this._createDOM(this.sceneData);
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
