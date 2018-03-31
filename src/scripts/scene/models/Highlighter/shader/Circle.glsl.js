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

float circle(in vec2 _st, in float _radius) {
  vec2 dist = _st - vec2(0.5);
	return 1.0 - smoothstep(_radius - (_radius * 0.01),
                          _radius + (_radius * 0.01),
                          dot(dist, dist) * 4.0);
}

void main() {
  float animatedTime = cos(sin(time));
  
	vec3 color = vec3(circle(vUv, animatedTime));
	float r = 0.0;// circle(vUv, animatedTime);
	float g = 0.0;// circle(vUv, animatedTime);
	float b = circle(vUv, animatedTime);
	
	float dominantColor = b;

	gl_FragColor = vec4(r, g, b, dominantColor);
}
`;

export default {
  vertex: vertex,
  fragment: fragment
};
