//visual-components
import { camera, renderer, scene } from "./main";
import { Rings } from "./visual-components/Rings";

const rings = new Rings();

export class Controller {
  visualComponents = [rings];
  activeComponent: number = 0;

  loadModels() {
    this.visualComponents.forEach((component) => {
      component.loadModels();
      console.log("loading all models");
    });
  }

  initComponents() {
    this.visualComponents.forEach((component) => {
      component.initComponent();
      console.log("initialising all component");
    });
  }

  initOSC() {
    this.visualComponents.forEach((component) => {
      component.initOSC();
      console.log("initialising all OSC handlers");
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
