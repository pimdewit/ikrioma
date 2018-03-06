import { Object3D, TetrahedronBufferGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class TetraHedron extends Object3D {
  constructor(size, detail, materialOptions) {
    super();

    const geometry = new TetrahedronBufferGeometry(size, detail);
    const material = new MeshStandardMaterial({
      color: 0xff0000,
      roughness: 0.5,
      flatShading: true
    });

    this.mesh = new Mesh(geometry, material);

    this.add(this.mesh);
  }

  render() {
    this.mesh.rotation.x += 0.01;
  }
}
