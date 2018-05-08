import { isIOS } from './isIOS';

/**
 * Whether the user agent is Internet Explorer 9.
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isIOS9OrLess() {
  if (!isIOS()) {
    return false;
  }

  const re = /(iPhone|iPad|iPod) OS ([\d_]+)/;
  const iOSVersion = navigator.userAgent.match(re);
  if (!iOSVersion) {
    return false;
  }

  // Get the last group.
  const versionString = iOSVersion[iOSVersion.length - 1];
  const majorVersion = parseFloat(versionString);
  return majorVersion <= 9;
}
