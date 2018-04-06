varying vec2 vUv;

uniform float time;

float circle(in vec2 _st, in float _radius) {
  vec2 dist = _st - vec2(0.5);
  return 1.0 - smoothstep(_radius, _radius, dot(dist, dist) * 4.0);
}

void main() {
  float animatedTime = cos(sin(time));

  vec3 color = vec3(circle(vUv, animatedTime));
  float r = 0.0;// circle(vUv, animatedTime - 0.8);
  float g = 0.0;// circle(vUv, animatedTime - 0.5);
  float b = circle(vUv, animatedTime) - g;

  float alpha = b;

  gl_FragColor = vec4(r, g, b, alpha);
}
