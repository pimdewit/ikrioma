import {Object3D, Mesh, PlaneBufferGeometry, ShaderMaterial, AdditiveBlending, MultiplyBlending} from 'three';

import vertex from './shader/Circle.vert.glsl';
import fragment from './shader/Circle.frag.glsl';

class HighLighter extends Object3D {
  constructor() {
    super();

    this.uniforms = {
      time: {
        value: 0.0
      }
    };

    const geometry = new PlaneBufferGeometry(8, 8);
    const material = new ShaderMaterial( {
      uniforms:this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      blending: AdditiveBlending,
      transparent: true
    });

    const mesh = new Mesh(geometry, material);

    this.matrixAutoUpdate = false;

    this.add(mesh);
  }

  render() {
    this.uniforms.time.value += 0.01;
  }
}

export default HighLighter;
