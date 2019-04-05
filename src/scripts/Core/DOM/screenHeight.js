/**
 * Get the full screen height.
 * @return {number}
 */
export function screenHeight() {
  return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
}
