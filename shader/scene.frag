// 精度修飾子の宣言（フラグメントシェーダにはほぼ必須で lowp, mediump, highp がある）
precision mediump float;
uniform vec2 resolution;
uniform float time;
// previous scene texture
uniform sampler2D backbuffer;

// フラグメントシェーダプログラムのエントリポイントとなる関数（名前は必ず main とする）
void main(){
    vec2 p = gl_FragCoord.xy / resolution;
    // シェーダから出力する色（RGBA を 0.0 ～ 1.0 で出力）
    gl_FragColor = vec4(0,p,1.0);
}
