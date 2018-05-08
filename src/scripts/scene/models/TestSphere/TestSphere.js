import { LOD, Mesh, BoxHelper } from 'three';

export default class TestSphere extends LOD {
  constructor(meshInfo, debug = false) {
    super();

    this.counter = Math.random() * 1000;

    for (let i = 0; i < meshInfo.length; i++) {
      const geometry = meshInfo[i][0];
      const material = meshInfo[i][1];
      const distance = meshInfo[i][2];

      const mesh = new Mesh(geometry, material);

      mesh.castShadow = true;
      mesh.receiveShadow = true;

      this.addLevel(mesh, distance);
    }

    this.debug = debug;
  }

  set debug(debug) {

    this._debug = debug;

    // If debug mode is on, and does not have
    if (debug && !this._hasDebugMesh) {
      this._Ikrioma = {};
      this._Ikrioma.debugBoundingBox = new BoxHelper(this);
      this._Ikrioma.debugBoundingBox.material.color.setHex(0x000000);
      this._hasDebugMesh = true;
    }

    if (this._hasDebugMesh) this.debugMesh.visible = debug;
  }

  get debug() {
    return this._debug;
  }

  get debugMesh() {
    return this._Ikrioma.debugBoundingBox;
  }

  render() {
    this.counter += 0.01;
    this.position.y = Math.sin(this.counter) * 4;
    this.rotation.y += Math.cos(this.counter) / 20;

    if (this.debug) {
      this.debugMesh.update();
    }
  }
}
