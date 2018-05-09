/**
 * Whether the app is loaded in an Iframe.
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
