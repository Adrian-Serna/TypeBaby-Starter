import { Engine, Scene, ArcRotateCamera, Vector3, CubeTexture, Color4, Mesh, StandardMaterial, Texture, Color3 } from '@babylonjs/core';
import '@babylonjs/inspector';

export let canvas: HTMLCanvasElement
export let engine: Engine
export let scene: Scene
export let camera: ArcRotateCamera

export const createEngine = (hostCanvas: HTMLCanvasElement) => {
  canvas = hostCanvas
  engine = new Engine(canvas, true, {}, true)

  let handleResize = () => engine.resize()
  window.addEventListener('resize', handleResize)

  return engine
}

export const createScene = () => {
  scene = new Scene(engine)

  scene.clearColor = new Color4(0.8, 0.8, 0.8, 1);

  /** optimize scene for opaque background */ 
  scene.autoClear = false;
  scene.autoClearDepthAndStencil = false;

  /** Show the inspector when pressing shift + alt + I 
   * make sure you have the focus on "canvas" by clicking on it.
   */
  scene.onKeyboardObservable.add(({ event }) => {
    if (event.shiftKey && event.altKey && event.code === 'KeyI') {
      console.log("info")
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide()
      } else {
        scene.debugLayer.show()
      }
    }
  })

  return scene
}

export const createArcRotateCamera = () => {
    const startAlpha = Math.PI / 2;
    const startBeta = Math.PI / 2;
    const startRadius = 16
    const startPosition = new Vector3(0, 1.7, 0)
    const camera = new ArcRotateCamera('camera', startAlpha, startBeta, startRadius, startPosition, scene, true)
    camera.attachControl(canvas, false)

    /** Set some basic camera settings */ 
    camera.minZ = 0.1;
    camera.lowerBetaLimit = Math.PI * 1.8/ 4;
    camera.upperBetaLimit = Math.PI * 2.2 / 4;
    camera.lowerRadiusLimit = 4;
    camera.upperRadiusLimit = 14;
    camera.allowUpsideDown = false;
    camera.wheelPrecision = 250;

    camera.radius = 7;

    camera.useAutoRotationBehavior = true;
    if(camera.autoRotationBehavior != null){
      camera.autoRotationBehavior.idleRotationSpeed = 0.18;
    }

    camera.pinchPrecision = 1000;
    
    return camera
}

export const createSkybox = (skyTextureUrl: string) => {
  
  var skybox = Mesh.CreateBox("skyBox", 100.0, scene);
  var skyboxMaterial = new StandardMaterial("skyBox", scene);
  skyboxMaterial.backFaceCulling = false;
  skyboxMaterial.reflectionTexture = new CubeTexture(skyTextureUrl, scene);
  skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
  skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
  skyboxMaterial.specularColor = new Color3(0, 0, 0);
  skyboxMaterial.disableLighting = true;
  skybox.material = skyboxMaterial;
  
  return skybox
}
