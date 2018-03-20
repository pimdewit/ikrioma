import { Object3D, Mesh, PlaneBufferGeometry, MeshPhongMaterial } from 'three';

class Ground extends Object3D {
  constructor() {
    super();

    const geometry = new PlaneBufferGeometry(10000, 10000);
    const material = new MeshPhongMaterial({ color: 0xffbf00, specular: 0x050505 });

    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -10;
    mesh.receiveShadow = true;
    this.add(mesh);
  }
}

export default Ground;
