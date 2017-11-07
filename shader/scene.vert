// VBO経由で送られてきた頂点座標
attribute vec3 position;
// VBO経由で送られてきた頂点カラー
attribute vec4 color;
// マウス座標
uniform vec2 mouse;
// フラグメントシェーダに値を渡すための varying 変数
varying vec4 vColor;
// 頂点シェーダプログラムのエントリポイントとなる関数（名前は必ず main とする）
void main(){
    // フラグメントシェーダに頂点カラーをそのまま渡す
    vColor = color;
    float f = length(mouse);
    // 頂点シェーダから出力する頂点の座標
    gl_Position = vec4(position * f, 1.0);
    // 頂点の大きさは頂点シェーダで設定する
    gl_PointSize = 20.0;
}