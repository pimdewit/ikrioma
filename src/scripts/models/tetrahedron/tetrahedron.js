import { Object3D, TetrahedronBufferGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class TetraHedron extends Object3D {
  constructor(detail, materialOptions) {
    super();

    const geometry = new TetrahedronBufferGeometry(1, detail);
    const material = new MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.5,
      flatShading: true
    });
    const mesh = new Mesh(geometry, material);

    this.add(mesh);
  }
}
