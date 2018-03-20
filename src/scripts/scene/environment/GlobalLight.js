import { Object3D, HemisphereLight, AmbientLight, DirectionalLight, HemisphereLightHelper, DirectionalLightHelper, CameraHelper } from 'three';

class GlobalLight extends Object3D {
  constructor(hemiColor) {
    super();

    const ambient = new AmbientLight(0xff0000, 0.1);

    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.position.set(0, 50, 0);

    const hemiLightHelper = new HemisphereLightHelper(hemiLight, 10);

    this._dirLight = new DirectionalLight(0xffffff, 1);
    const dirLightHelper = new DirectionalLightHelper(this._dirLight, 10);
    this._dirLight.color.setHSL(0.1, 1, 0.95);
    this._dirLight.position.set(-1, 1.75, 1);
    this._dirLight.position.multiplyScalar(30);

    this._dirLight.castShadow = true;

    this._dirLight.shadow.mapSize.width = 2048;
    this._dirLight.shadow.mapSize.height = 2048;

    this._dirLight.shadow.camera.far = 3500;
    this._dirLight.shadow.bias = -0.0001;

    const helper = new CameraHelper( this._dirLight.shadow.camera );

    this.add(ambient);
    this.add(hemiLight);
    this.add(this._dirLight);
    this.add(helper);
  }

  set shadow(scalar) {
    if (scalar > 0) {
      this._dirLight.shadow.camera.left = -scalar;
      this._dirLight.shadow.camera.right = scalar;
      this._dirLight.shadow.camera.top = scalar;
      this._dirLight.shadow.camera.bottom = -scalar;
    } else {
      this._dirLight.castShadow = false;
    }
  }
}

export default GlobalLight;