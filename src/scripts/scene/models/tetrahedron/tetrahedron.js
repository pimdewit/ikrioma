import { LOD, Mesh } from 'three';

import { DEFAULTS } from '../constants';

export default class TestSphere extends LOD {
  constructor(geometries, material) {
    super();

    this.counter = Math.random() * 1000;

    this.material = material || DEFAULTS.MATERIAL;

    for (let i = 0; i < geometries.length; i++) {
      const geometry = geometries[i][0];
      const distance = geometries[i][1];

      const mesh = new Mesh(geometry, this.material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.addLevel(mesh, distance);
    }
  }

  render() {
    this.counter += 0.01;
    this.position.y = Math.sin(this.counter) * 4;
    this.rotation.y += 0.01;
  }
}
