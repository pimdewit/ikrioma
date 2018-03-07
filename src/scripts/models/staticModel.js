import { Object3D, Mesh } from 'three';

const CONSTANTS = {
  QUALITY_HIGH: 'high',
  QUALITY_STANDARD: 'medium',
  QUALITY_LOW: 'low'
};

export default class LODMesh extends Object3D {
  constructor(geometries, materials) {
    super();

    this._quality = CONSTANTS.QUALITY_LOW;

    this.geometry = geometries[CONSTANTS.QUALITY_LOW];
    this.material = null;

    /** @type {Mesh|Null} */
    this._mesh = null;

    this.add(this._mesh);
  }

  set quality(quality) {
    if (quality === this._quality) return;

    this._quality = quality;
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

  get quality() {
    return this._quality;
  }
}
