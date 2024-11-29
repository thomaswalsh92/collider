//libs
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

//collider
import { modelManager, textureManager, scene, stagingScene } from "../main";
import { useModel } from "../utils/useModel";
import { useOSC } from "../utils/useOSC";
import { useTexture } from "../utils/useTexture";
// import { sixteenthToBpm } from "../utils/sixteenthToBpm";

export class Rings {
  //textures
  ring1textures: THREE.Texture[] = [];
  ring2textures: THREE.Texture[] = [];
  ring3textures: THREE.Texture[] = [];
  //models
  ring1: THREE.Mesh | undefined = undefined;
  ring2: THREE.Mesh | undefined = undefined;
  ring3: THREE.Mesh | undefined = undefined;

  //lights
  light: THREE.PointLight = new THREE.PointLight("#ff0011", 0);

  //animation props
  //model
  minSpinRate: number = 0.2;
  maxSpinRate: number = 3;
  variableSpinRate: number = this.minSpinRate;

  //aniamtion props
  //lights
  maxIntensity: number = 10;
  minIntensity: number = 0;

  //tweens
  //model
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

  //tweens
  //lights
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

  //

  loadTextures() {
    this.ring1textures = useTexture([
      {
        path: "textures/ring1-diffuse.png",
        type: "map",
      },
      {
        path: "textures/ring1-roughnessMap.png",
        type: "roughnessMap",
      },
      {
        path: "textures/ring1-normalMap.png",
        type: "normalMap",
      },
    ]);

    this.ring2textures = useTexture([
      {
        path: "textures/ring2-diffuse.png",
        type: "map",
      },
      {
        path: "textures/ring2-roughnessMap.png",
        type: "roughnessMap",
      },
      {
        path: "textures/ring2-normalMap.png",
        type: "normalMap",
      },
    ]);

    this.ring3textures = useTexture([
      {
        path: "textures/ring3-diffuse.png",
        type: "map",
      },
      {
        path: "textures/ring3-roughnessMap.png",
        type: "roughnessMap",
      },
      {
        path: "textures/ring3-normalMap.png",
        type: "normalMap",
      },
    ]);
  }

  //run at load models step
  loadModels() {
    useModel({
      modelPath: "models/gltf/ring1.glb",
      manager: modelManager,
    });
    useModel({
      modelPath: "models/gltf/ring2.glb",
      manager: modelManager,
    });
    useModel({
      modelPath: "models/gltf/ring3.glb",
      manager: modelManager,
    });
  }

  //run at initialise step
  initComponent() {
    const ring1 = stagingScene.children.find(
      (x) => x.name === "ring1"
    ) as unknown as THREE.Mesh;
    ring1.position.set(0, 0, 0);
    const ring1Mat = new THREE.MeshPhysicalMaterial({ color: "#32DE8A" });
    // ring1Mat.map = this.ring1textures.find(
    //   (x) => x.name === "map"
    // ) as THREE.Texture;
    ring1Mat.roughnessMap = this.ring1textures.find(
      (x) => x.name === "roughnessMap"
    ) as THREE.Texture;
    ring1Mat.normalMap = this.ring1textures.find(
      (x) => x.name === "normalMap"
    ) as THREE.Texture;
    ring1.material = ring1Mat;
    this.ring1 = ring1;

    const ring2 = stagingScene.children.find(
      (x) => x.name === "ring2"
    ) as unknown as THREE.Mesh;
    ring2.position.set(0, 0, 0);
    const ring2Mat = new THREE.MeshPhysicalMaterial({ color: "#009FF5" });
    // ring2Mat.map = this.ring2textures.find(
    //   (x) => x.name === "map"
    // ) as THREE.Texture;
    ring2Mat.roughnessMap = this.ring2textures.find(
      (x) => x.name === "roughnessMap"
    ) as THREE.Texture;
    ring2Mat.normalMap = this.ring2textures.find(
      (x) => x.name === "normalMap"
    ) as THREE.Texture;
    ring2.material = ring2Mat;
    this.ring2 = ring2;

    const ring3 = stagingScene.children.find(
      (x) => x.name === "ring3"
    ) as unknown as THREE.Mesh;
    ring3.position.set(0, 0, 0);
    const ring3Mat = new THREE.MeshPhysicalMaterial({ color: "#FF9B71" });
    // ring3Mat.map = this.ring3textures.find(
    //   (x) => x.name === "map"
    // ) as THREE.Texture;
    ring3Mat.roughnessMap = this.ring3textures.find(
      (x) => x.name === "roughnessMap"
    ) as THREE.Texture;
    ring3Mat.normalMap = this.ring3textures.find(
      (x) => x.name === "normalMap"
    ) as THREE.Texture;
    ring3.material = ring3Mat;
    this.ring3 = ring3;

    this.light.castShadow = true;
    this.light.shadow.camera.near = 0.1;
    this.light.shadow.camera.far = 100;
    this.light.position.set(0, 0, 0);
  }

  initOSC() {
    useOSC("16th", (args) => {
      if (args.value === 1) {
        this.spinRateTweenDown.stop();
        this.spinRateTweenUp.start();
        this.lightPulseTween.start();
      }
    });

    useOSC("note3", () => {
      this.spinRateTweenUp.stop();
      this.spinRateTweenDown.start();
    });
  }

  mountComponent() {
    this.ring1 && scene.add(this.ring1);
    this.ring2 && scene.add(this.ring2);
    this.ring3 && scene.add(this.ring3);
    this.light && scene.add(this.light);
  }

  unmountComponent() {
    this.ring1 && scene.remove(this.ring1);
    this.ring2 && scene.remove(this.ring2);
    this.ring3 && scene.remove(this.ring3);
    this.light && scene.remove(this.light);
  }

  //called by anim loop
  animate() {
    this.animateRing1();
    this.animateRing2();
    this.animateRing3();
    this.updateTweens();
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
