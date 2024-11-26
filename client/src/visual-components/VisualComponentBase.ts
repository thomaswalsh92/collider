//! EXAMPLE CLASS FOR ALL COMPONENTS TO BE USED BY CONTROLLER
//extend is not currently being used
//todo figure out correct inheritance

export class VisualComponentBase {
  //load all models using useModel
  loadModels() {}

  //add models, lights and all needed assets from staging scene or from three
  initComponent() {}

  //register all relevant OSC handlers with useOSC
  initOSC() {}

  //add all relevant assets to scene
  mountComponent() {}

  //remove all relevant assets from scene
  unmountComponent() {}

  //called all animation methods in this class from here
  animate() {}
}
