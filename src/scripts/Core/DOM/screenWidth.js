/**
 * Get the full screen width.
 *
 * @since 0.0.2
 *
 * @returns {number}
 */
export function screenWidth() {
  return Math.max(window.screen.width, window.screen.height) * window.devicePixelRatio;
}
