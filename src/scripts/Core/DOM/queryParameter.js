/**
 * Get a query parameter. [More info](http://goo.gl/4WX3tg)
 *
 * @since 0.0.2
 *
 * @param {string} name The variable name you would like to retrieve.
 * @returns {null|string}
 */
export function queryParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
