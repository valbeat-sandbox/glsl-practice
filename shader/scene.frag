// 精度修飾子の宣言（フラグメントシェーダにはほぼ必須で lowp, mediump, highp がある）
precision mediump float;
// vertexシェーダーから送られてくる色
varying vec4 vColor;

// フラグメントシェーダプログラムのエントリポイントとなる関数（名前は必ず main とする）
void main(){
    // シェーダから出力する色（RGBA を 0.0 ～ 1.0 で出力）
    gl_FragColor = vColor;
}
