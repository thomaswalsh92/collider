//libs
import * as THREE from "three";

//collider
import { manager, scene } from "../main";
import { useModel } from "../utils/useModel";
import { useOSC } from "../utils/useOSC";

export class Rings {
  ring1: THREE.Object3D<THREE.Object3DEventMap> | undefined = undefined;
  ring2: THREE.Object3D<THREE.Object3DEventMap> | undefined = undefined;
  ring3: THREE.Object3D<THREE.Object3DEventMap> | undefined = undefined;
  light: THREE.PointLight = new THREE.PointLight("#ff0099", 5);
  latestNote: number = 1;

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
    scene.add(this.light);
  }

  initOSC() {
    useOSC("note1", () => {
      this.latestNote = 1;
    });

    useOSC("note3", () => {
      this.latestNote = 3;
    });
  }

  animateRing1() {
    this.ring1?.rotateX(0.004);
    this.ring1?.rotateY(0.003);
    this.ring1?.rotateZ(0.002);
  }

  animateRing2() {
    this.ring2?.rotateX(0.006);
    this.ring2?.rotateY(0.005);
    this.ring2?.rotateZ(0.003);
  }

  animateRing3() {
    this.ring3?.rotateX(0.01);
    this.ring3?.rotateY(0.008);
    this.ring3?.rotateZ(0.005);
  }
}
