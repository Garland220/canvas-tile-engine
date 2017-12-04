import { Engine, Scene, Mesh, PointLight, SpotLight, FreeCamera, Vector3, Color3, Color4 } from 'babylonjs';
import { Key } from './KeyCodes';

export class Client {
  private engine:Engine;
  private scene:Scene;
  private camera:FreeCamera;
  private canvas:HTMLCanvasElement;

  constructor(canvas:HTMLCanvasElement) {
    this.engine = new Engine(canvas);
    this.canvas = canvas;
  }

  public KeyDown(event:KeyboardEvent):void {
    if (event.keyCode === Key.LeftArrow) {
      this.camera.position;
    }
  }

  public static MapCoords(x:number,y:number,z:number) {
    return [x,z,y];
  }

  public DefaultScene():void {
    this.scene = new Scene(this.engine);
    this.scene.useRightHandedSystem = true;
    this.scene.ambientColor = new BABYLON.Color3(1, 1, 1);
    this.scene.clearColor = Color3.White().toColor4();
    this.camera = new FreeCamera('Client Camera', new Vector3(0,10,-10), this.scene);
    this.camera.setTarget(Vector3.Zero());
    this.camera.upVector = new BABYLON.Vector3(0, 0, 1);
    this.camera.attachControl(this.canvas, true);
    let floor = Mesh.CreateGround('Floor', 100, 100, 1, this.scene, false);
    let box = Mesh.CreateBox('Box', 6.0, this.scene);
    box.position.y = 3;
    let light = new PointLight('pointLight', new Vector3(0, 5, 0), this.scene);
    let spotlight = new SpotLight('spotLight', new Vector3(0, 10, -10), new Vector3(0, 0, 0), Math.PI / 3, 2, this.scene);
    let particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);
    particleSystem.particleTexture = new BABYLON.Texture("flare.png", this.scene);
    // particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 3.5, -1); // Starting all From
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 3, 1); // To...
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    particleSystem.emitRate = 1000;
    particleSystem.emitter = box;
    particleSystem.start();
    light.parent = box;
    spotlight.specular = new Color3(0, 0, 1);
    // spotlight.diffuse = new Color3(0, 0, 1);

    light.intensity = 0.6 + Math.random() * 0.05;

    this.scene.registerBeforeRender(function() {
      // light.intensity = 0.6 + Math.random() * 0.05;
      light.diffuse = new Color3(0.8 + Math.random() * 0.1, 0, 0);
      light.specular = new Color3(0.8+ Math.random() * 0.1, 0.8+ Math.random() * 0.1, 0);
      // light.position.x += Math.random() * 0.125 - 0.0625;
      // light.position.z += Math.random() * 0.125 - 0.0625;
    });

    this.ChangeScene(this.scene);
  }

  public ChangeScene(scene:Scene):void {
    // scene.debugLayer.show();
    this.engine.runRenderLoop(function () {
      scene.render();
    });
  }
}
