import * as THREE from "three";
import Figure from "./Figure";

const PERSPECTIVE = 800;

export default class Scene {
  constructor() {
    this.container = document.getElementById("stage");

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      alpha: true
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.initLights();
    this.initCamera();

    // add stuff into scene
    this.figure = new Figure(this.scene, () => {
      // run scene
      this.update();
    });
  }

  initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientLight);
  }

  initCamera() {
    const fov =
      (180 * (2 * Math.atan(window.innerHeight / 2 / PERSPECTIVE))) / Math.PI;
    const aspectRatio = window.innerWidth / window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(fov, aspectRatio, 1, 1000);
    this.camera.position.set(0, 0, PERSPECTIVE);
  }

  update() {
    if (this.renderer === undefined) return;
    requestAnimationFrame(this.update.bind(this));
    this.figure.update();

    this.renderer.render(this.scene, this.camera);
  }
}
