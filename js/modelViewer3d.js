/**
 * NASA Space Apps Challenge - Team smAsh
 * Interactive 3D Hardware Inspector / Holographic Model Viewer
 */

class HardwareModelViewer3D {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.modelGroup = new THREE.Group();
    this.isWireframe = false;
    this.materials = [];
    
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.autoRotate = true;
    this.subsystemMeshes = [];

    this.init();
  }

  init() {
    if (!this.container) return;

    this.scene = new THREE.Scene();

    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 300;

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 1.8, 4.5);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(6, 12, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = -1.2;
    this.scene.add(gridHelper);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(5, 10, 7);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf59e0b, 1.0);
    dirLight2.position.set(-5, -5, -5);
    this.scene.add(dirLight2);

    this.scene.add(this.modelGroup);

    this.setupInteraction();
    window.addEventListener('resize', () => this.onResize());

    this.animate();
  }

  loadModel(modelType, relic) {
    // Clear previous
    while (this.modelGroup.children.length > 0) {
      const child = this.modelGroup.children[0];
      this.modelGroup.remove(child);
    }
    this.materials = [];
    this.subsystemMeshes = [];

    switch (modelType) {
      case "helicopter":
        this.buildHelicopterModel();
        break;
      case "lander":
        this.buildLanderModel();
        break;
      case "descent_stage":
        this.buildDescentStageModel();
        break;
      case "lrv":
        this.buildLRVModel();
        break;
      case "rover":
      default:
        this.buildRoverModel();
        break;
    }
  }

  // 3D Procedural Mars Rover (Opportunity / Spirit / Sojourner archetype)
  buildRoverModel() {
    const goldMat = this.createMaterial(0xd97706, 0.4, 0.8);
    const darkMat = this.createMaterial(0x334155, 0.8, 0.2);
    const metalMat = this.createMaterial(0x94a3b8, 0.3, 0.9);
    const solarMat = this.createMaterial(0x1e3a8a, 0.2, 0.7);
    const lensMat = this.createMaterial(0x06b6d4, 0.1, 0.9);

    // Chassis Body
    const bodyGeo = new THREE.BoxGeometry(1.6, 0.45, 1.1);
    const body = new THREE.Mesh(bodyGeo, goldMat);
    body.position.y = -0.2;
    this.modelGroup.add(body);

    // Solar Wings (deck)
    const deckGeo = new THREE.BoxGeometry(1.9, 0.05, 1.4);
    const deck = new THREE.Mesh(deckGeo, solarMat);
    deck.position.y = 0.05;
    this.modelGroup.add(deck);

    // Solar Wing panels (outriggers)
    const leftWingGeo = new THREE.BoxGeometry(0.5, 0.03, 1.0);
    const leftWing = new THREE.Mesh(leftWingGeo, solarMat);
    leftWing.position.set(-1.1, 0.05, 0);
    this.modelGroup.add(leftWing);

    const rightWingGeo = new THREE.BoxGeometry(0.5, 0.03, 1.0);
    const rightWing = new THREE.Mesh(rightWingGeo, solarMat);
    rightWing.position.set(1.1, 0.05, 0);
    this.modelGroup.add(rightWing);

    // Mastcam Neck
    const mastGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 12);
    const mast = new THREE.Mesh(mastGeo, metalMat);
    mast.position.set(0.6, 0.6, 0.4);
    this.modelGroup.add(mast);

    // Camera Head Bar
    const headGeo = new THREE.BoxGeometry(0.35, 0.12, 0.18);
    const head = new THREE.Mesh(headGeo, darkMat);
    head.position.set(0.6, 1.15, 0.4);
    this.modelGroup.add(head);

    // Twin Eyes (Pancam stereo)
    const eyeGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 12);
    eyeGeo.rotateX(Math.PI / 2);
    const eye1 = new THREE.Mesh(eyeGeo, lensMat);
    eye1.position.set(0.5, 1.15, 0.5);
    const eye2 = new THREE.Mesh(eyeGeo, lensMat);
    eye2.position.set(0.7, 1.15, 0.5);
    this.modelGroup.add(eye1);
    this.modelGroup.add(eye2);

    // High Gain Dish Antenna
    const dishGeo = new THREE.SphereGeometry(0.24, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2.5);
    const dish = new THREE.Mesh(dishGeo, metalMat);
    dish.position.set(-0.5, 0.25, -0.3);
    dish.rotation.x = Math.PI / 4;
    this.modelGroup.add(dish);

    // 6 Wheels (Rocker-Bogie configuration)
    const wheelPositions = [
      [-0.8, -0.85, 0.7],
      [0.0, -0.85, 0.75],
      [0.8, -0.85, 0.7],
      [-0.8, -0.85, -0.7],
      [0.0, -0.85, -0.75],
      [0.8, -0.85, -0.7]
    ];

    const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.14, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, darkMat);
      wheel.position.set(pos[0], pos[1], pos[2]);
      this.modelGroup.add(wheel);

      // Strut connecting to chassis
      const strutGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.7, 8);
      const strut = new THREE.Mesh(strutGeo, metalMat);
      strut.position.set(pos[0] * 0.7, pos[1] + 0.35, pos[2] * 0.6);
      this.modelGroup.add(strut);
    });

    // Robotic Arm in front
    const armGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.6, 8);
    armGeo.rotateZ(Math.PI / 3);
    const arm = new THREE.Mesh(armGeo, metalMat);
    arm.position.set(0.85, -0.35, 0.1);
    this.modelGroup.add(arm);
  }

  // 3D Procedural Ingenuity Mars Helicopter
  buildHelicopterModel() {
    const metalMat = this.createMaterial(0xd1d5db, 0.2, 0.9);
    const carbonMat = this.createMaterial(0x18181b, 0.9, 0.1);
    const solarMat = this.createMaterial(0x1e3a8a, 0.2, 0.8);
    const bodyMat = this.createMaterial(0xd97706, 0.5, 0.6);

    // Fuselage Box (cubesat body)
    const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cube = new THREE.Mesh(cubeGeo, bodyMat);
    cube.position.y = -0.3;
    this.modelGroup.add(cube);

    // Mast
    const mastGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.4, 12);
    const mast = new THREE.Mesh(mastGeo, metalMat);
    mast.position.y = 0.4;
    this.modelGroup.add(mast);

    // Top Solar Panel
    const solarGeo = new THREE.BoxGeometry(0.8, 0.02, 0.6);
    const solar = new THREE.Mesh(solarGeo, solarMat);
    solar.position.y = 1.1;
    this.modelGroup.add(solar);

    // Antenna needle on top
    const antGeo = new THREE.CylinderGeometry(0.008, 0.008, 0.4, 8);
    const ant = new THREE.Mesh(antGeo, metalMat);
    ant.position.y = 1.3;
    this.modelGroup.add(ant);

    // Lower Rotor Blades (spinning representation)
    const blade1Geo = new THREE.BoxGeometry(2.4, 0.015, 0.14);
    const blade1 = new THREE.Mesh(blade1Geo, carbonMat);
    blade1.position.y = 0.3;
    this.modelGroup.add(blade1);

    // Upper Rotor Blades
    const blade2Geo = new THREE.BoxGeometry(2.4, 0.015, 0.14);
    const blade2 = new THREE.Mesh(blade2Geo, carbonMat);
    blade2.position.y = 0.65;
    blade2.rotation.y = Math.PI / 2;
    this.modelGroup.add(blade2);

    // Four composite landing legs
    const legAngles = [Math.PI / 4, 3 * Math.PI / 4, 5 * Math.PI / 4, 7 * Math.PI / 4];
    legAngles.forEach(ang => {
      const legGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.1, 8);
      const leg = new THREE.Mesh(legGeo, carbonMat);
      leg.position.set(Math.cos(ang) * 0.45, -0.7, Math.sin(ang) * 0.45);
      leg.rotation.z = Math.sin(ang) * 0.45;
      leg.rotation.x = Math.cos(ang) * 0.45;
      this.modelGroup.add(leg);

      // Foot pad
      const footGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const foot = new THREE.Mesh(footGeo, metalMat);
      foot.position.set(Math.cos(ang) * 0.75, -1.15, Math.sin(ang) * 0.75);
      this.modelGroup.add(foot);
    });
  }

  // 3D Procedural Lander (InSight / Phoenix / Surveyor 3)
  buildLanderModel() {
    const metalMat = this.createMaterial(0xe2e8f0, 0.3, 0.8);
    const solarMat = this.createMaterial(0x1e3a8a, 0.2, 0.7);
    const goldMat = this.createMaterial(0xd97706, 0.4, 0.7);
    const darkMat = this.createMaterial(0x334155, 0.7, 0.2);

    // Central Hexagonal Deck
    const deckGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.3, 6);
    const deck = new THREE.Mesh(deckGeo, goldMat);
    deck.position.y = -0.1;
    this.modelGroup.add(deck);

    // Dual Circular UltraFlex Solar Panels (InSight / Phoenix style)
    const panelGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.02, 24);
    panelGeo.rotateX(Math.PI / 2);

    const leftPanel = new THREE.Mesh(panelGeo, solarMat);
    leftPanel.position.set(-1.8, -0.05, 0);
    this.modelGroup.add(leftPanel);

    const rightPanel = new THREE.Mesh(panelGeo, solarMat);
    rightPanel.position.set(1.8, -0.05, 0);
    this.modelGroup.add(rightPanel);

    // Seismometer WTS Wind Shield Dome (SEIS)
    const domeGeo = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const dome = new THREE.Mesh(domeGeo, metalMat);
    dome.position.set(0.6, -1.0, 0.6);
    this.modelGroup.add(dome);

    // Robotic Deployment Arm
    const armGeo1 = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
    armGeo1.rotateZ(Math.PI / 4);
    const arm1 = new THREE.Mesh(armGeo1, metalMat);
    arm1.position.set(0.4, 0.25, 0.3);
    this.modelGroup.add(arm1);

    // Three Landing Legs with Shock Absorbers
    for (let i = 0; i < 3; i++) {
      const angle = (i * 2 * Math.PI) / 3;
      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 8);
      const leg = new THREE.Mesh(legGeo, metalMat);
      leg.position.set(Math.cos(angle) * 0.9, -0.7, Math.sin(angle) * 0.9);
      leg.rotation.z = Math.sin(angle) * 0.5;
      leg.rotation.x = Math.cos(angle) * 0.5;
      this.modelGroup.add(leg);

      // Footpad
      const padGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.04, 12);
      const pad = new THREE.Mesh(padGeo, darkMat);
      pad.position.set(Math.cos(angle) * 1.3, -1.15, Math.sin(angle) * 1.3);
      this.modelGroup.add(pad);
    }
  }

  // 3D Procedural Apollo 11 Lunar Module Descent Stage / Sky Crane
  buildDescentStageModel() {
    const goldMat = this.createMaterial(0xf59e0b, 0.2, 0.9); // Gold foil Kapton
    const darkMat = this.createMaterial(0x1e293b, 0.7, 0.3);
    const metalMat = this.createMaterial(0xe2e8f0, 0.3, 0.9);

    // Octagonal base body (Apollo Descent Stage)
    const baseGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.7, 8);
    const base = new THREE.Mesh(baseGeo, goldMat);
    base.position.y = -0.1;
    this.modelGroup.add(base);

    // Central Rocket Bell (DPS engine nozzle)
    const nozzleGeo = new THREE.ConeGeometry(0.45, 0.7, 16, 1, true);
    const nozzle = new THREE.Mesh(nozzleGeo, darkMat);
    nozzle.position.y = -0.65;
    this.modelGroup.add(nozzle);

    // Upper stage ring / launch platform
    const ringGeo = new THREE.TorusGeometry(0.9, 0.06, 8, 24);
    ringGeo.rotateX(Math.PI / 2);
    const ring = new THREE.Mesh(ringGeo, metalMat);
    ring.position.y = 0.25;
    this.modelGroup.add(ring);

    // Four Quad Cantilever Landing Legs
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const legGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.6, 8);
      const leg = new THREE.Mesh(legGeo, goldMat);
      leg.position.set(Math.cos(angle) * 1.4, -0.6, Math.sin(angle) * 1.4);
      leg.rotation.z = Math.sin(angle) * 0.6;
      leg.rotation.x = Math.cos(angle) * 0.6;
      this.modelGroup.add(leg);

      // Saucer Footpad
      const padGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16);
      const pad = new THREE.Mesh(padGeo, goldMat);
      pad.position.set(Math.cos(angle) * 1.9, -1.15, Math.sin(angle) * 1.9);
      this.modelGroup.add(pad);

      // Probe antenna wire underneath
      const probeGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.5, 8);
      const probe = new THREE.Mesh(probeGeo, metalMat);
      probe.position.set(Math.cos(angle) * 1.9, -0.9, Math.sin(angle) * 1.9);
      this.modelGroup.add(probe);
    }

    // Ladder strut on front leg
    const ladderGeo = new THREE.BoxGeometry(0.18, 1.2, 0.02);
    const ladder = new THREE.Mesh(ladderGeo, metalMat);
    ladder.position.set(0, -0.5, 1.4);
    ladder.rotation.x = -0.4;
    this.modelGroup.add(ladder);
  }

  // 3D Procedural Apollo 15 Lunar Roving Vehicle (LRV)
  buildLRVModel() {
    const metalMat = this.createMaterial(0x94a3b8, 0.4, 0.8);
    const darkMat = this.createMaterial(0x1e293b, 0.8, 0.2);
    const meshMat = this.createMaterial(0xcbd5e1, 0.2, 0.9);

    // Chassis Flatbed
    const chassisGeo = new THREE.BoxGeometry(1.4, 0.15, 2.2);
    const chassis = new THREE.Mesh(chassisGeo, metalMat);
    chassis.position.y = -0.4;
    this.modelGroup.add(chassis);

    // Twin Lawn-Chair Astronaut Seats
    const seat1Geo = new THREE.BoxGeometry(0.4, 0.5, 0.05);
    const seat1 = new THREE.Mesh(seat1Geo, darkMat);
    seat1.position.set(-0.35, 0.0, 0.1);
    this.modelGroup.add(seat1);

    const seat2Geo = new THREE.BoxGeometry(0.4, 0.5, 0.05);
    const seat2 = new THREE.Mesh(seat2Geo, darkMat);
    seat2.position.set(0.35, 0.0, 0.1);
    this.modelGroup.add(seat2);

    // Steering T-Handle Console
    const stickGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
    const stick = new THREE.Mesh(stickGeo, metalMat);
    stick.position.set(0, -0.1, 0.4);
    stick.rotation.x = -0.3;
    this.modelGroup.add(stick);

    // High Gain Umbrella Dish Antenna
    const dishGeo = new THREE.SphereGeometry(0.35, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    const dish = new THREE.Mesh(dishGeo, meshMat);
    dish.position.set(-0.4, 0.6, 0.9);
    dish.rotation.x = Math.PI / 3;
    this.modelGroup.add(dish);

    // 4 Woven Piano Wire Wheels
    const wheelPositions = [
      [-0.9, -0.65, 0.8],
      [0.9, -0.65, 0.8],
      [-0.9, -0.65, -0.8],
      [0.9, -0.65, -0.8]
    ];

    const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.16, 16);
    wheelGeo.rotateZ(Math.PI / 2);

    wheelPositions.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeo, meshMat);
      wheel.position.set(pos[0], pos[1], pos[2]);
      this.modelGroup.add(wheel);

      // Fender / mudguard
      const fenderGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.2, 16, 1, true, 0, Math.PI);
      fenderGeo.rotateZ(Math.PI / 2);
      const fender = new THREE.Mesh(fenderGeo, darkMat);
      fender.position.set(pos[0], pos[1] + 0.06, pos[2]);
      this.modelGroup.add(fender);
    });
  }

  createMaterial(color, roughness = 0.5, metalness = 0.5) {
    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      wireframe: this.isWireframe
    });
    this.materials.push(mat);
    return mat;
  }

  toggleWireframe() {
    this.isWireframe = !this.isWireframe;
    this.materials.forEach(mat => {
      mat.wireframe = this.isWireframe;
    });
    return this.isWireframe;
  }

  setupInteraction() {
    const dom = this.renderer.domElement;

    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      setTimeout(() => {
        if (!this.isDragging) this.autoRotate = true;
      }, 4000);
    });

    dom.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousMousePosition.x;
      const deltaY = e.clientY - this.previousMousePosition.y;

      this.modelGroup.rotation.y += deltaX * 0.01;
      this.modelGroup.rotation.x += deltaY * 0.01;

      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    // Touch
    let touchStart = { x: 0, y: 0 };
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoRotate = false;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    dom.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStart.x;
        const deltaY = e.touches[0].clientY - touchStart.y;
        this.modelGroup.rotation.y += deltaX * 0.01;
        this.modelGroup.rotation.x += deltaY * 0.01;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    dom.addEventListener('touchend', () => {
      this.isDragging = false;
    });
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 300;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.autoRotate && this.modelGroup) {
      this.modelGroup.rotation.y += 0.008;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
