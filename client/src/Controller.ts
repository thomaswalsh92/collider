//visual-components
import { camera, renderer, scene } from "./main";
import { useOSC } from "./utils/useOSC";
import { Rings } from "./visual-components/Rings";
import { Spheres } from "./visual-components/Sphere";
// import { VisualComponentBase } from "./visual-components/VisualComponentBase";

const rings = new Rings();
const spheres = new Spheres();

//todo add different controller modes
export type ControllerModes = "randomCycle" | "OSCTriggered";

export class Controller {
  visualComponents = [rings, spheres];
  activeComponent: number = 0;
  mode: ControllerModes = "randomCycle";

  loadTextures() {
    this.visualComponents.forEach((component) => {
      component.loadTextures();
    });
  }

  loadModels() {
    this.visualComponents.forEach((component) => {
      component.loadModels();
    });
  }

  initComponents() {
    this.visualComponents.forEach((component) => {
      component.initComponent();
    });
  }

  initComponentOSC() {
    this.visualComponents.forEach((component) => {
      component.initOSC();
    });
  }

  animateVisualComponent() {
    this.visualComponents[this.activeComponent].animate();
  }

  start() {
    this.visualComponents[this.activeComponent].mountComponent();

    const renderLoop = () => {
      requestAnimationFrame(renderLoop); //loop the render function
      renderer.render(scene, camera); // render the scene using the camera
      this.animateVisualComponent();
    };

    renderLoop(); //start rendering
  }
}
