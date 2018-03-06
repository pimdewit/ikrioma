import OrbitControls from "../third_party/OrbitControls";
import Camera from '../components/camera';


const element = document.querySelector('[ikrioma-canvas]');

class Controls {
  constructor(distance) {
    this._controls = new OrbitControls(Camera, {
      element: element,
      parent: element,
      distance: distance
    });
  }

  render() {
    this._controls.update();
  }
}

export default Controls;
