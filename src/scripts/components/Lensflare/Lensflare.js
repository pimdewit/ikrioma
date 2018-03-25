import {
  Object3D, Mesh, MeshBasicMaterial,
  Vector2, Vector3, Vector4,
  NearestFilter, DataTexture, RGBFormat, ClampToEdgeWrapping, RawShaderMaterial,
  InterleavedBuffer, InterleavedBufferAttribute, BufferGeometry,
  Box2,
  Color, AdditiveBlending
} from 'three';

import {LensflareGeometry} from './Common';
import vertex from './shader/vertex';
import fragment from './shader/fragment';

class Lensflare extends Mesh {
  constructor() {
    super();

    this.type = 'Lensflare';
    this.frustumCulled = false;
    this.renderOrder = Infinity;

    this._Ikrioma = {};
    this._Ikrioma.elements = [];

    this._Ikrioma.positionScreen = new Vector3();

    this._Ikrioma.tempMap = new DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat);
    this._Ikrioma.tempMap.minFilter = NearestFilter;
    this._Ikrioma.tempMap.maxFilter = NearestFilter;
    this._Ikrioma.tempMap.wrapS = ClampToEdgeWrapping;
    this._Ikrioma.tempMap.wrapT = ClampToEdgeWrapping;
    this._Ikrioma.tempMap.needsUpdate = true;

    this._Ikrioma.occlusionMap = new DataTexture(new Uint8Array(16 * 16 * 3), 16, 16, RGBFormat);
    this._Ikrioma.occlusionMap.minFilter = NearestFilter;
    this._Ikrioma.occlusionMap.magFilter = NearestFilter;
    this._Ikrioma.occlusionMap.wrapS = ClampToEdgeWrapping;
    this._Ikrioma.occlusionMap.wrapT = ClampToEdgeWrapping;
    this._Ikrioma.occlusionMap.needsUpdate = true;

    this._Ikrioma.geometry = LensflareGeometry;

    this._Ikrioma.material1a = new RawShaderMaterial({
      uniforms: {
        'scale': {value: null},
        'screenPosition': {value: null}
      },
      vertexShader: [
        'precision highp float;',

        'uniform vec3 screenPosition;',
        'uniform vec2 scale;',

        'attribute vec3 position;',

        'void main() {',

        '	gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );',

        '}'
      ].join('\n'),
      fragmentShader: [
        'precision highp float;',

        'void main() {',

        '	gl_FragColor = vec4( 1.0, 0.0, 1.0, 1.0 );',

        '}'
      ].join('\n'),
      depthTest: true,
      depthWrite: false,
      transparent: false
    });

    this._Ikrioma.material1b = new RawShaderMaterial({
      uniforms: {
        'map': {value: this._Ikrioma.tempMap},
        'scale': {value: null},
        'screenPosition': {value: null}
      },
      vertexShader: [
        'precision highp float;',

        'uniform vec3 screenPosition;',
        'uniform vec2 scale;',

        'attribute vec3 position;',
        'attribute vec2 uv;',

        'varying vec2 vUV;',

        'void main() {',

        '	vUV = uv;',

        '	gl_Position = vec4( position.xy * scale + screenPosition.xy, screenPosition.z, 1.0 );',

        '}'
      ].join('\n'),
      fragmentShader: [
        'precision highp float;',

        'uniform sampler2D map;',

        'varying vec2 vUV;',

        'void main() {',

        '	gl_FragColor = texture2D( map, vUV );',

        '}'
      ].join( '\n' ),
      depthTest: false,
      depthWrite: false,
      transparent: false
    });

    this._Ikrioma.mesh1 = new Mesh(this._Ikrioma.geometry, this._Ikrioma.material1a);

    this._Ikrioma.shader = {
      uniforms: {
        'map': {value: null},
        'occlusionMap': {value: null},
        'color': {value: null},
        'scale': {value: null},
        'screenPosition': {value: null}
      },

      vertexShader: vertex,
      fragmentShader: fragment
    };

    this._Ikrioma.material2 = new RawShaderMaterial({
      uniforms: {
        'map': {value: null},
        'occlusionMap': {value: this._Ikrioma.occlusionMap},
        'color': {value: new Color(0xffffff)},
        'scale': {value: new Vector2()},
        'screenPosition': {value: new Vector3()}
      },
      vertexShader: this._Ikrioma.shader.vertexShader,
      fragmentShader: this._Ikrioma.shader.fragmentShader,
      blending: AdditiveBlending,
      transparent: true,
      depthWrite: false
    });

    this._Ikrioma.mesh2 = new Mesh(this._Ikrioma.geometry , this._Ikrioma.material2);

    this._Ikrioma.scale = new Vector2();
    this._Ikrioma.screenPositionPixels = new Vector2();
    this._Ikrioma.validArea = new Box2();
    this._Ikrioma.viewport = new Vector4();
  }

  addElement(element) {
    this._Ikrioma.elements.push(element);
  }

  onBeforeRender(renderer, scene, camera) {
    super.onBeforeRender();
		this._Ikrioma.viewport.copy(renderer.getCurrentViewport());

		const invAspect = this._Ikrioma.viewport.w / this._Ikrioma.viewport.z;
		const halfViewportWidth = this._Ikrioma.viewport.z / 2.0;
    const halfViewportHeight = this._Ikrioma.viewport.w / 2.0;

    // console.log(invAspect);

		const size = 16 / this._Ikrioma.viewport.w;
		this._Ikrioma.scale.set(size * invAspect, size);

		this._Ikrioma.validArea.min.set(this._Ikrioma.viewport.x, this._Ikrioma.viewport.y);
		this._Ikrioma.validArea.max.set(this._Ikrioma.viewport.x + (this._Ikrioma.viewport.z - 16), this._Ikrioma.viewport.y + (this._Ikrioma.viewport.w - 16));

		// calculate position in screen space

		this._Ikrioma.positionScreen.setFromMatrixPosition(this.matrixWorld);

		this._Ikrioma.positionScreen.applyMatrix4(camera.matrixWorldInverse);
		this._Ikrioma.positionScreen.applyMatrix4(camera.projectionMatrix);

		// horizontal and vertical coordinate of the lower left corner of the pixels to copy

		this._Ikrioma.screenPositionPixels.x = this._Ikrioma.viewport.x + (this._Ikrioma.positionScreen.x * halfViewportWidth) + halfViewportWidth - 8;
		this._Ikrioma.screenPositionPixels.y = this._Ikrioma.viewport.y + (this._Ikrioma.positionScreen.y * halfViewportHeight) + halfViewportHeight - 8;

		// screen cull

		if (this._Ikrioma.validArea.containsPoint(this._Ikrioma.screenPositionPixels)) {

      // console.log(renderer);

			// save current RGB to temp texture


			renderer.copyFramebufferToTexture(this._Ikrioma.screenPositionPixels, this._Ikrioma.tempMap);

			// render pink quad
      //
			this._Ikrioma.material1a.uniforms.scale.value = this._Ikrioma.scale;
      this._Ikrioma.material1a.uniforms.screenPosition.value = this._Ikrioma.positionScreen;

      // console.log(this._Ikrioma.geometry.type);
      // console.log(this._Ikrioma.geometry);
      // console.log(this._Ikrioma.material1a.type);
      // console.log(this._Ikrioma.material1a);
      // console.log(this._Ikrioma.mesh1.type, this._Ikrioma.mesh1);
      // debugger;


      renderer.renderBufferDirect(camera, null, this._Ikrioma.geometry, this._Ikrioma.material1a, this._Ikrioma.mesh1, null);

			// copy result to occlusionMap

			renderer.copyFramebufferToTexture(this._Ikrioma.screenPositionPixels, this._Ikrioma.occlusionMap);

			// restore graphics

			this._Ikrioma.material1b.uniforms.scale.value = this._Ikrioma.scale;
			this._Ikrioma.material1b.uniforms.screenPosition.value = this._Ikrioma.positionScreen;

			renderer.renderBufferDirect(camera, null, this._Ikrioma.geometry, this._Ikrioma.material1b, this._Ikrioma.mesh1, null);

			// render elements

			const vecX = - this._Ikrioma.positionScreen.x * 2;
			const vecY = - this._Ikrioma.positionScreen.y * 2;

			for (let i = 0, l = this._Ikrioma.elements.length; i < l; i++) {

				const element = this._Ikrioma.elements[ i ];

				this._Ikrioma.material2.uniforms.color.value.copy(element.color);
				this._Ikrioma.material2.uniforms.map.value = element.texture;
				this._Ikrioma.material2.uniforms.screenPosition.value.x = this._Ikrioma.positionScreen.x + vecX * element.distance;
				this._Ikrioma.material2.uniforms.screenPosition.value.y = this._Ikrioma.positionScreen.y + vecY * element.distance;

				const size = element.size / this._Ikrioma.w;
				const invAspect = this._Ikrioma.viewport.w / this._Ikrioma.viewport.z;

				this._Ikrioma.material2.uniforms.scale.value.set( size * invAspect, size );

				this._Ikrioma.material2.uniformsNeedUpdate = true;

				renderer.renderBufferDirect(camera, null, this._Ikrioma.geometry, this._Ikrioma.material2, this._Ikrioma.mesh2, null);

			}

		}
  }
}

export function LensflareElement(texture, size, distance, color) {

	this.texture = texture;
	this.size = size || 1;
	this.distance = distance || 0;
	this.color = color || new Color( 0xffffff );

};

export default Lensflare;
