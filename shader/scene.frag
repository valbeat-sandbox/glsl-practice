// 精度修飾子の宣言（フラグメントシェーダにはほぼ必須で lowp, mediump, highp がある）
precision mediump float;
uniform vec2 resolution;
uniform float time;
// previous scene texture
uniform sampler2D backbuffer;

float orb(vec2 position, vec2 offset) {
    vec2 q = position - offset;
    float len = length(q);
    return 0.02/len;
}

// フラグメントシェーダプログラムのエントリポイントとなる関数（名前は必ず main とする）
void main(){
    vec2 position = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    float light1 = orb(position, vec2(-0.5,0.0));
    float light2 = orb(position, vec2(0.5,0.0));
    gl_FragColor = vec4(vec3(light1 + light2), 1.0);
}