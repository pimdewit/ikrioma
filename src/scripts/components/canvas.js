const libName = `ikrioma`;
const ATTRIBUTE_CANVAS = `${libName}-canvas`;
const ATTRIBUTE_ROOT = `${libName}-root`;
const root = document.querySelector(`[${ATTRIBUTE_ROOT}]`);

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.setAttribute(ATTRIBUTE_CANVAS, '');
