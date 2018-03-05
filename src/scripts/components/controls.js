import OrbitControls from "../third_party/OrbitControls";
import Camera  from '../components/camera';


const element = document.querySelector('[ikrioma-canvas]');

const controls = new OrbitControls(Camera, {
  element: element,
  parent: element,
  distance: 10 });

controls.render = controls.update;

export default controls;
