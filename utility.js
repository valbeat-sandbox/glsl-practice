"use strict";

/**
 * XHR でシェーダのソースコードを外部ファイルから取得しコールバックを呼ぶ
 * @param {string} vsPath - 頂点シェーダの記述されたファイルのパス
 * @param {string} fsPath - フラグメントシェーダの記述されたファイルのパス
 * @param {function} callback - コールバック関数（読み込んだソースコードを引数に与えて呼び出される）
 */
function loadShaderSource(vsPath, fsPath, callback){
    let vs = null,
        fs = null;
    xhr(vsPath, true);
    xhr(fsPath, false);
    function xhr(source, isVertex){
        let xml = new XMLHttpRequest();
        xml.open('GET', source, true);
        xml.setRequestHeader('Pragma', 'no-cache');
        xml.setRequestHeader('Cache-Control', 'no-cache');
        xml.onload = () => {
            if(isVertex){
                vs = xml.responseText;
            }else{
                fs = xml.responseText;
            }
            if(vs !== null && fs !== null){
                console.log('loaded', vsPath, fsPath);
                callback({vs: vs, fs: fs});
            }
        };
        xml.send();
    }
}

function addVersion(url) {
    if(url.match(/\?v=/)) {
        return url;
    }
    const arr = url.split('#');
    let hash = '';
    if (arr.length > 1) {
        url = arr[0];
        hash = arr[1];
    }
    const paramStr = url.split('?').shift();
    const params = paramStr.split('&');
    for (let param of params) {
        const keyValue = param.split('=');
        const key = keyValue[0];
        let value = keyValue[1];
        if (key === 'v') {
            value = createVersion();
        }
        url += url.indexOf('?') < 0 ? '?' : '&';
        url += key + '=' + value;
    }
    if (hash) {
        url += '#' + hash;
    }
    return url;
}

function createVersion() {
    return parseInt(new Date() / 1000);
}
