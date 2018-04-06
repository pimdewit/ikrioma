import {LOD, Mesh, BoxHelper, ShaderMaterial, BackSide, NormalBlending} from 'three';

import vertex from './shader/SpawnGradient.vert.glsl';
import fragment from './shader/SpawnGradient.frag.glsl';

import { DEFAULTS } from '../constants';

export default class SpawnIndicator extends LOD {
  constructor(meshInfo, debug = false) {
    super();

    this.counter = Math.random() * 1000;

    this.uniforms = {
      time: {
        value: 0.0
      }
    };

    const mat = new ShaderMaterial( {
      uniforms:this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      side: BackSide,
      blending: NormalBlending
    });

    for (let i = 0; i < meshInfo.length; i++) {
      const geometry = meshInfo[i][0];
      const material = meshInfo[i][1];
      const distance = meshInfo[i][2];

      const mesh = new Mesh(geometry, mat);

      // mesh.castShadow = true;
      // mesh.receiveShadow = true;

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

    this.uniforms.time.value = this.counter;
    this.rotation.y = this.counter;

    if (this.debug) {
      this.debugMesh.update();
    }
  }
}
