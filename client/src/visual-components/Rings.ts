//libs
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

//collider
import { manager, scene } from "../main";
import { useModel } from "../utils/useModel";
import { useOSC } from "../utils/useOSC";

export class Rings {
  ring1: THREE.Object3D<THREE.Object3DEventMap> | undefined = undefined;
  ring2: THREE.Object3D<THREE.Object3DEventMap> | undefined = undefined;
  ring3: THREE.Object3D<THREE.Object3DEventMap> | undefined = undefined;
  light: THREE.PointLight = new THREE.PointLight("#ff0011", 0);
  latestNote: number = 1;

  minSpinRate: number = 0.2;
  maxSpinRate: number = 3;
  variableSpinRate: number = this.minSpinRate;
  spinRateTweenUp = new TWEEN.Tween({ rate: this.minSpinRate })
    .to({ rate: this.maxSpinRate }, 400)
    .onUpdate(({ rate }) => {
      this.variableSpinRate = rate;
    });
  spinRateTweenDown = new TWEEN.Tween({ rate: this.maxSpinRate })
    .to({ rate: this.minSpinRate }, 400)
    .onUpdate(({ rate }) => {
      this.variableSpinRate = rate;
    });

  maxIntensity: number = 10;
  minIntensity: number = 0;
  lightPulseTween = new TWEEN.Tween({ intensity: this.maxIntensity })
    .to(
      {
        intensity: this.minIntensity,
      },
      1400
    )
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(({ intensity }) => {
      this.light.intensity = intensity;
    });

  loadModels() {
    useModel({
      modelPath: "models/gltf/ring1.glb",
      textures: [
        { path: "textures/ring1-diffuse.png", type: "map" },
        { path: "textures/ring1-roughnessMap.png", type: "roughnessMap" },
        { path: "textures/ring1-normalMap.png", type: "normalMap" },
      ],
      scene: scene,
      manager: manager,
    });
    useModel({
      modelPath: "models/gltf/ring2.glb",
      textures: [
        { path: "textures/ring2-diffuse.png", type: "map" },
        { path: "textures/ring2-roughnessMap.png", type: "roughnessMap" },
        { path: "textures/ring2-normalMap.png", type: "normalMap" },
      ],
      scene: scene,
      manager: manager,
    });
    useModel({
      modelPath: "models/gltf/ring3.glb",
      textures: [
        { path: "textures/ring3-diffuse.png", type: "map" },
        { path: "textures/ring3-roughnessMap.png", type: "roughnessMap" },
        { path: "textures/ring3-normalMap.png", type: "normalMap" },
      ],
      scene: scene,
      manager: manager,
    });
  }

  initComponent() {
    this.ring1 = scene.children.find((x) => x.name === "ring1");
    this.ring1?.position.set(0, 0, 0);
    this.ring2 = scene.children.find((x) => x.name === "ring2");
    this.ring2?.position.set(0, 0, 0);
    this.ring3 = scene.children.find((x) => x.name === "ring3");
    this.ring3?.position.set(0, 0, 0);
    this.light.castShadow = true;
    this.light.shadow.camera.near = 0.1;
    this.light.shadow.camera.far = 100;
    this.light.position.set(0, 0, 0);
    scene.add(this.light);
  }

  initOSC() {
    useOSC("note1", () => {
      this.spinRateTweenDown.stop();
      this.spinRateTweenUp.start();
      this.lightPulseTween.start();
    });

    useOSC("note2", () => {
      this.spinRateTweenUp.stop();
      this.spinRateTweenDown.start();
    });
  }

  animateRing1() {
    this.ring1?.rotateX(0.004 * this.variableSpinRate);
    this.ring1?.rotateY(0.003 * this.variableSpinRate);
    this.ring1?.rotateZ(0.002 * this.variableSpinRate);
  }

  animateRing2() {
    this.ring2?.rotateX(0.006 * this.variableSpinRate);
    this.ring2?.rotateY(0.005 * this.variableSpinRate);
    this.ring2?.rotateZ(0.003 * this.variableSpinRate);
  }

  animateRing3() {
    this.ring3?.rotateX(0.01 * this.variableSpinRate);
    this.ring3?.rotateY(0.008 * this.variableSpinRate);
    this.ring3?.rotateZ(0.005 * this.variableSpinRate);
  }

  updateTweens() {
    this.spinRateTweenUp.update();
    this.spinRateTweenDown.update();
    this.lightPulseTween.update();
  }
}
