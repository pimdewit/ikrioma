export const vertex = `
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const fragment = `
varying vec2 vUv;

uniform float time;

float random (in float x) {
  return fract(sin(x)*1e4);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float randomSerie(float x, float freq, float t) {
  return step(0.5,random( floor(x*freq)-floor(t) ));
}

void main() {
  vec2 st = gl_FragCoord.xy/vUv.xy;
  st = vUv;
  // st.x *= vUv.x/vUv.y;
  
  float time = time * 0.01;
  float cols = 1.;
  float freq = random(floor(time))+abs(atan(time)*0.1);
  float t = 60.0+time*(1.0-freq)*30.0;

  if (fract(st.y * cols* 0.5) < 0.5) {
    t *= -1.0;
  }

  freq += random(floor(st.x));

  float offset = 0.25;
  
  float r = randomSerie(st.x, freq*1., t + offset);
  float g = randomSerie(st.x, freq*1., t);
  float b = randomSerie(st.x, freq*1., t - offset);

  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

export default {
  vertex: vertex,
  fragment: fragment
};
