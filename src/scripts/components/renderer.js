/** @type {Array<Object>} */
export const RENDER_TARGETS = [];

/**
 * Render the "render()" methods of an array of classes.
 */
export function render() {
  RENDER_TARGETS.forEach(target => {
    if (typeof target.render === 'function') {
      target.render();
    } else {
      console.warn(`%c${target.constructor.name}`, 'font-weight: bold', `does not have a render() method.`);
      console.warn(`Removing target from render targets array.`);
      RENDER_TARGETS.splice(target, 1);
    }
  });
}
