/**
 * 参考URL
 * http://blog.tsumikiinc.com/article/20160225_threejs-points.html
 */

'use strict';

var renderW = window.innerWidth;
var renderH = window.innerHeight;

var init = function() {
  // 描画を行うために必要なレンダラーを準備
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(renderW, renderH);
  document.body.appendChild(renderer.domElement);
  // シーン
  var scene = new THREE.Scene();
  // カメラ
  var camera = new THREE.PerspectiveCamera(45, renderW/renderH, 0.1, 10000);

  // ジオメトリー生成
  var geometry = new THREE.Geometry();
  // ランダムな位置にvertices（頂点）を追加していく
  for (var i = 0; i < 5000; i++) {
    var x = Math.floor(Math.random() * 1000 - 500);
    var y = Math.floor(Math.random() * 1000 - 500);
    var z = Math.floor(Math.random() * 1000 - 500);
    geometry.vertices.push(new THREE.Vector3(x, y, z));
  }
  // テクスチャ
  var texture = THREE.ImageUtils.loadTexture('assets/textures/star.png');
  // マテリアル生成
  var material = new THREE.PointsMaterial({
    color: 0xffff00,
    size: 3,
    map: texture, // テクスチャをマッピングする
    transparent: true, // 透過させる
  });

  // Pointsクラスを使用することで
  // Geometryの頂点にあたるGL_POINTSを可視化して扱うようにする？
  // なおGL_POINTSは点（四角）である
  // 引数に渡すGeometryとMaterialは
  // BufferGeometryやShaderMaterialを利用することで表現の幅が広がる
  var points = new THREE.Points(geometry, material);
  scene.add(points);

  var update = function() {
    camera.rotation.x += 0.0003;
    camera.rotation.y += 0.0006;
    requestAnimationFrame(update);
    renderer.render(scene, camera);
  };
  update();
};

window.addEventListener('DOMContentLoaded', init);
