import {ImageBitmapLoader} from 'three';

class Graphic {
  constructor() {
    const parent = document.querySelector('[ikrioma-root]');
    this.canvas = document.createElement('canvas');
    this.canvas.width = 8;
    this.canvas.height = 8;

    this.context = this.canvas.getContext('2d');

  }

  draw() {
    this.context.fillStyle = 'yellow';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const imagebitmap = createImageBitmap(this.canvas);

    setTimeout(() => {
      this.context.fillStyle = '#bfc5d3';
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }, 2000);

    imagebitmap.then(blob => this._texture = blob);
  }

  get texture() {
    return this._texture;
  }
}

export default Graphic;

