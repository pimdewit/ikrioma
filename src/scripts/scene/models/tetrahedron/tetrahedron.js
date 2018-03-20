import { LOD, Mesh } from 'three';

import { DEFAULTS } from '../constants';

export default class TetraHedron extends LOD {
  constructor(geometries, material) {
    super();

    this.material = material || DEFAULTS.MATERIAL;

    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i][0];
      const distance = geometries[i][1];

      const mesh = new Mesh(geometry, this.material);

      this.addLevel(mesh, distance);
    }
  }

  render() {
  }
}
