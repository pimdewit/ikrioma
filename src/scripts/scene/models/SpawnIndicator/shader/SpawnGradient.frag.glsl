varying vec2 vUv;

uniform float time;

void main() {
  float animatedTime = cos(sin(time));

//  float r = 1.0 - vUv.y;
//  float g = 0.4 - vUv.y;
//  float b = 1.0;

  float r = ((1.0 - vUv.y) * 2.0) - 1.0;
  float g = ((0.4 - vUv.y) * 2.0) - 1.0;
  float b = 1.0;
  float alpha = r;

  gl_FragColor = vec4(r, g, b, alpha + vUv.y);
}
