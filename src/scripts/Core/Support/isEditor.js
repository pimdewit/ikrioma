import {queryParameter} from '../DOM/queryParameter';
import {parseBoolean} from './parseBoolean';

/**
 * Whether the app is running editor mode.
 *
 * @since 0.0.2
 *
 * @returns {boolean}
 */
export function isEditor() {
  const debug = queryParameter('editor');
  return parseBoolean(debug);
}
