import { MeshPhongMaterial } from 'three';


export const DEFAULTS = {
  MATERIAL: new MeshPhongMaterial({ color: 0xffffff, specular: 0xffffff, shininess: 0, flatShading: false }),
  MATERIAL_TWO: new MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff, shininess: 0, flatShading: true }),
};


