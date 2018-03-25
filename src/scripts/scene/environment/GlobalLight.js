import { Object3D, HemisphereLight, AmbientLight, DirectionalLight, HemisphereLightHelper, DirectionalLightHelper, CameraHelper, TextureLoader } from 'three';

import {Lensflare, LensflareElement} from '../../third_party/Lensflare';

class GlobalLight extends Object3D {
  constructor(hemiColor) {
    super();

    const ambient = new AmbientLight(0xff0000, 0.1);

    const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.position.set(0, 50, 0);

    const hemiLightHelper = new HemisphereLightHelper(hemiLight, 10);

    this._dirLight = new DirectionalLight(0xff0000, 1);
    const dirLightHelper = new DirectionalLightHelper(this._dirLight, 10);
    this._dirLight.color.setHSL(0.1, 1, 0.95);
    this._dirLight.position.set(-1, 1.75, 1);
    this._dirLight.position.multiplyScalar(30);

    this._dirLight.shadow.mapSize.width = 1024;
    this._dirLight.shadow.mapSize.height = 1024;

    this._dirLight.shadow.camera.far = 3500;
    this._dirLight.shadow.bias = 0;

    const helper = new CameraHelper(this._dirLight.shadow.camera);


    const loader = new TextureLoader();
    const texture = loader.load('https://i.imgur.com/jPXCDrq.png');
    const lensflare = new Lensflare();

    lensflare.addElement(new LensflareElement(texture, 2000, 0));
    lensflare.addElement(new LensflareElement(texture, 80, 0.4));
    lensflare.addElement(new LensflareElement(texture, 120, 0.7));
    lensflare.addElement(new LensflareElement(texture, 70, 1));
    this._dirLight.add(lensflare);

    this.add(ambient);

    this.add(hemiLight);
    this.add(hemiLightHelper);

    this.add(this._dirLight);
    this.add(dirLightHelper);

    this.add(helper);

  }

  set shadow(scalar) {
    if (scalar > 0) {
      this._dirLight.castShadow = true;
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
