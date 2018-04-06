/**
  * EaseLinear
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeNone(t, b, c, d) {
  return c * t / d + b;
}

/**
  * EaseInQuad
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInQuad(t, b, c, d) {
  return c * (t /= d) * t + b;
}

/**
  * EaseOutQuad
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutQuad(t, b, c, d) {
  return -c * (t /= d) * (t - 2) + b;
}

/**
  * EaseInOutQuad
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutQuad(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t + b;
  return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

/**
  * EaseOutInQuad
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInQuad(t, b, c, d) {
  if (t < d / 2) return easeOutQuad (t * 2, b, c / 2, d);
  return easeInQuad((t * 2)-d, b + c / 2, c / 2, d);
}

/**
  * EaseInCubic
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInCubic(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}

/**
  * EaseOutCubic
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}

/**
  * EaseInOutCubic
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutCubic(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t + 2) + b;
}

/**
  * EaseOutInCubic
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInCubic(t, b, c, d) {
  if (t < d / 2) return easeOutCubic (t * 2, b, c / 2, d);
  return easeInCubic((t * 2)-d, b + c / 2, c / 2, d);
}

/**
  * EaseInQuart
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInQuart(t, b, c, d) {
  return c * (t /= d) * t * t * t + b;
}

/**
  * EaseOutQuart
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutQuart(t, b, c, d) {
  return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

/**
  * EaseInOutQuart
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutQuart(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
  return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
}

/**
  * EaseOutInQuart
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInQuart(t, b, c, d) {
  if (t < d / 2) return easeOutQuart (t * 2, b, c / 2, d);
  return easeInQuart((t * 2)-d, b + c / 2, c / 2, d);
}

/**
  * EaseInQuint
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInQuint(t, b, c, d) {
  return c * (t /= d) * t * t * t * t + b;
}

/**
  * EaseOutQuint
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutQuint(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
}

/**
  * EaseInOutQuint
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutQuint(t, b, c, d) {
  if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
  return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
}

/**
  * EaseOutInQuint
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInQuint(t, b, c, d) {
  if (t < d / 2) return easeOutQuint (t * 2, b, c / 2, d);
  return easeInQuint((t * 2)-d, b + c / 2, c / 2, d);
}

/**
  * EaseInSine
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInSine(t, b, c, d) {
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}

/**
  * EaseOutSine
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutSine(t, b, c, d) {
  return c * Math.sin(t / d * (Math.PI / 2)) + b;
}

/**
  * EaseInOutSine
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutSine(t, b, c, d) {
  return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
}

/**
  * EaseOutInSine
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInSine(t, b, c, d) {
  if (t < d / 2) return easeOutSine (t * 2, b, c / 2, d);
  return easeInSine((t * 2)-d, b + c / 2, c / 2, d);
}

/**
  * EaseInExpo
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInExpo(t, b, c, d) {
  return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
}

/**
  * EaseOutExpo
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutExpo(t, b, c, d) {
  return (t == d) ? b + c : c * 1.001 * (-Math.pow(2, -10 * t / d) + 1) + b;
}

/**
  * EaseInOutExpo
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutExpo(t, b, c, d) {
  if (t == 0) return b;
  if (t == d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
  return c / 2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
}

/**
  * EaseOutInExpo
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInExpo(t, b, c, d) {
  if (t < d / 2) return easeOutExpo (t * 2, b, c / 2, d);
  return easeInExpo((t * 2) - d, b + c / 2, c / 2, d);
}

/**
  * EaseInCirc
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInCirc(t, b, c, d) {
  return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
}

/**
  * EaseOutCirc
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutCirc(t, b, c, d) {
  return c * Math.sqrt(1 - (t = t / d - 1 ) * t) + b;
}

/**
  * EaseInOutCirc
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeInOutCirc(t, b, c, d) {
  if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
  return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}

/**
  * EaseOutInCirc
  *
  * @since 0.0.1
  *
  * @param {number} t Current time
  * @param {number} b Starting value.
  * @param {number} c Change needed in value.
  * @param {number} d Expected easing duration
  * @return {number}
  */
export function easeOutInCirc(t, b, c, d) {
  if (t < d / 2) return easeOutCirc (t * 2, b, c / 2, d);
  return easeInCirc((t * 2) - d, b + c / 2, c / 2, d);
}
