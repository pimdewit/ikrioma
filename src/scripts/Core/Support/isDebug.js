import {queryParameter} from '../DOM/queryParameter';
import {parseBoolean} from './parseBoolean';

/**
 * Whether the app is running debug mode.
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isDebug() {
  const debug = queryParameter('debug');
  return parseBoolean(debug);
}
