import {Object3D, Mesh, PlaneBufferGeometry, ShaderMaterial, AdditiveBlending} from 'three';
import Shader from './shader/Circle.glsl';

class HighLighter extends Object3D {
  constructor() {
    super();

    this.uniforms = {
      time: {
        value: 0.0
      }
    };

    const geometry = new PlaneBufferGeometry(16, 16);
    const material = new ShaderMaterial( {
      uniforms:this.uniforms,
      vertexShader: Shader.vertex,
      fragmentShader: Shader.fragment,
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
