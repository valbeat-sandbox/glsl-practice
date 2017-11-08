// 精度修飾子の宣言（フラグメントシェーダにはほぼ必須で lowp, mediump, highp がある）
precision mediump float;
uniform vec2 resolution;
uniform float time;
// previous scene texture
uniform sampler2D backbuffer;

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

float orb(vec2 position, vec2 offset) {
    vec2 q = position - offset;
    float len = length(q);
    return 0.02/len;
}

// フラグメントシェーダプログラムのエントリポイントとなる関数（名前は必ず main とする）
void main(){
    // 基点からの位置
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    // 光の定義
    vec3 light = vec3(0.0);
    for(int i = 1; i <= 20; ++i){
        // HSV 色空間による計算のために Hue を求める
        float hue = (1.0/ 20.0) * float(i);
        // HSV で色取得
        vec3 color = hsv(hue, 1.0, 1.0);
        float f = float(i) * 0.25;
        vec2 offset = vec2(cos(time * f), sin(time * f)) * 0.75;
        light += color * orb(p, offset);
    }
    // そのピクセルの出力する色を設定
    gl_FragColor = vec4(light, 1.0);
}