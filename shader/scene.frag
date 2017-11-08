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
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    float light = 0.0;
    for(int i = 1; i <= 20; ++i){
        float f = float(i) * 0.25;
        vec2 offset = vec2(cos(time * f), sin(time * f)) * 0.75;
        light += orb(p, offset);
    }
    gl_FragColor = vec4(vec3(light), 1.0);
}