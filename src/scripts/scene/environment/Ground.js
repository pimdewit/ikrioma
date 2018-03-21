import { Object3D, Mesh, PlaneBufferGeometry, MeshPhongMaterial } from 'three';

class Ground extends Object3D {
  constructor() {
    super();

    const geometry = new PlaneBufferGeometry(32, 32);
    const material = new MeshPhongMaterial({ color: 0x788196, specular: 0x111111 });

    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;

    this.add(mesh);
  }
}

export default Ground;
