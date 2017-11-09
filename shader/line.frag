// 精度修飾子の宣言（フラグメントシェーダにはほぼ必須で lowp, mediump, highp がある）
precision mediump float;
uniform vec2 resolution;
uniform float time;
// previous scene texture
uniform sampler2D backbuffer;

// フラグメントシェーダプログラムのエントリポイントとなる関数（名前は必ず main とする）
void main(){
    // 基点からの位置
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / resolution;
    // 光の定義
    float l = 0.01 / abs(p.y + sin((p.x - time) * 5.0) * 0.5);
    // そのピクセルの出力する色を設定
    gl_FragColor = vec4(vec3(l), 1.0);
}