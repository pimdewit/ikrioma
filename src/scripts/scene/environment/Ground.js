import {Object3D, Mesh, PlaneBufferGeometry, MeshPhongMaterial, Texture} from 'three';
import Graphic from '../../components/sandbox';

class Ground extends Object3D {
  constructor() {
    super();

    this.graphic = new Graphic();

    this.graphic.draw();

    const geometry = new PlaneBufferGeometry(32, 32);
    this.material = new MeshPhongMaterial({ color: 0x788196, specular: 0x111111 });
    this.material.map = new Texture(this.graphic.canvas);

    this.material.map.needsUpdate = true;

    setTimeout(() => {
      this.material.map.needsUpdate = true;
    }, 3000);

    const mesh = new Mesh(geometry, this.material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;

    this.matrixAutoUpdate = false;

    this.add(mesh);
  }
}

export default Ground;
