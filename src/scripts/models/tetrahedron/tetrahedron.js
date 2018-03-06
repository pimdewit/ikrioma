import { Object3D, Mesh } from 'three';

import { geometry as GeoLow } from './geometry/geometry-lq.js';
import { geometry as GeoStandard } from './geometry/geometry-standard.js';
import { geometry as GeoHigh } from './geometry/geometry-hq.js';
import { material as MaterialStandard } from './material/materials.js';

const CONSTANTS = {
  QUALITY_HIGH: 'high',
  QUALITY_STANDARD: 'medium',
  QUALITY_LOW: 'low'
};

export default class TetraHedron extends Object3D {
  constructor(size, detail, materialOptions) {
    super();

    this.geometry = GeoLow;
    this.material = MaterialStandard;

    this._mesh = new Mesh(this.geometry, this.material);

    this.add(this._mesh);
  }

  set quality(quality) {
    this.removeMesh();

    switch(quality) {
      case CONSTANTS.QUALITY_HIGH:
        this.geometry = GeoHigh;
        break;
      case CONSTANTS.QUALITY_STANDARD:
        this.geometry = GeoStandard;
        break;
      case CONSTANTS.QUALITY_LOW:
        this.geometry = GeoLow;
        break;
    }

    this._mesh = new Mesh(this.geometry, this.material);

    this.add(this._mesh);
  }

  removeMesh() {
    this.remove(this._mesh);
  }

  addMesh() {
    this.add(this._mesh);
  }

  render() {
    if (this._mesh) this._mesh.rotation.x += 0.01;
  }
}
