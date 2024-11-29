//libs
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

//collider
import { scene } from "../main";

export class Spheres {
  //models
  sphere1: THREE.Mesh | undefined = undefined;

  //lights

  //animation props
  //model

  //aniamtion props
  //lights

  //tweens
  //model

  //tweens
  //lights

  loadTextures() {}

  //run at load models step
  loadModels() {}

  //run at initialise step
  initComponent() {
    const sphere = new THREE.SphereGeometry(4, 32, 32);
    const mesh = new THREE.Mesh();
    const mat = new THREE.MeshPhysicalMaterial({ color: "#2D3047" });
    mesh.geometry = sphere;
    mesh.material = mat;
    this.sphere1 = mesh;
  }

  initOSC() {}

  mountComponent() {
    this.sphere1 && scene.add(this.sphere1);
  }

  unmountComponent() {
    this.sphere1 && scene.remove(this.sphere1);
  }

  //called by anim loop
  animate() {}

  //animate sub-methods
}
