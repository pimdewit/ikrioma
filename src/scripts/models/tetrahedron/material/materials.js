import { MeshStandardMaterial } from 'three';

const material = new MeshStandardMaterial({
  color: 0xff0000,
  roughness: 0.5,
  flatShading: true
});

export default material;
