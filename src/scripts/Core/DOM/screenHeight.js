/**
 * Get the full screen height.
 *
 * @since 0.0.2
 *
 * @returns {number}
 */
export function screenHeight() {
  return Math.min(window.screen.width, window.screen.height) * window.devicePixelRatio;
}
