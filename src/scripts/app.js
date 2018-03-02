import '../styles/main.scss';

import { RENDER_TARGETS, render } from "./components/renderer";
import resize from 'brindille-resize';

resize.addListener(onResize);

function onResize() {
  console.groupCollapsed('Resized window');
  console.log(`w: ${resize.width} h: ${resize.height}`);
  console.groupEnd();
}
