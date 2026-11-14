/**
 * NASA Space Apps Challenge - Team smAsh
 * Interactive 3D Planetary Visualization with Three.js
 */

class PlanetViewer3D {
  constructor(containerId, onSelectRelic) {
    this.container = document.getElementById(containerId);
    this.onSelectRelic = onSelectRelic;
    this.currentBody = "Mars"; // "Mars" or "Moon"
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.planetMesh = null;
    this.atmosphereMesh = null;
    this.markerGroup = new THREE.Group();
    this.starfield = null;
    
    this.radius = 5.0;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.0015 };
    this.autoRotate = true;
    
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.markers = []; // { mesh, data }
    this.targetRotation = null;
    this.isTransitioning = false;

    this.init();
  }

  init() {
    if (!this.container) return;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || 500;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.z = 13.5;

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x222233, 1.2);
    this.scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(20, 10, 20);
    this.scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.4);
    rimLight.position.set(-20, -10, -20);
    this.scene.add(rimLight);

    // 5. Starfield
    this.createStarfield();

    // 6. Build Planet & Markers
    this.buildPlanet(this.currentBody);
    this.scene.add(this.markerGroup);

    // 7. Event listeners
    this.setupInteraction();
    window.addEventListener('resize', () => this.onWindowResize());

    // 8. Animation loop
    this.animate();
  }

  createStarfield() {
    const starCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = (Math.random() - 0.5) * 200;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color variation (white, slight blue, slight yellow)
      const r = 0.8 + Math.random() * 0.2;
      const g = 0.8 + Math.random() * 0.2;
      const b = 0.9 + Math.random() * 0.1;
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    this.starfield = new THREE.Points(geometry, material);
    this.scene.add(this.starfield);
  }

  // Generates procedural canvas textures for Mars or the Moon
  createPlanetTexture(body) {
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    if (body === "Mars") {
      // Base Mars ochre-rust gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#f2ece4'); // North polar ice cap
      grad.addColorStop(0.12, '#b85434');
      grad.addColorStop(0.5, '#c96138'); // Equator
      grad.addColorStop(0.88, '#944128');
      grad.addColorStop(1, '#f2ece4'); // South polar ice cap
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dark basaltic plains (Syrtis Major, Acidalia, Sinus Sabaeus)
      ctx.fillStyle = '#6e3020';
      for (let i = 0; i < 35; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.3 + Math.random() * canvas.height * 0.4;
        const rad = 60 + Math.random() * 180;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.globalAlpha = 0.35 + Math.random() * 0.3;
        ctx.fill();
      }

      // Valles Marineris canyon streak
      ctx.strokeStyle = '#421a10';
      ctx.lineWidth = 14;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.4, canvas.height * 0.55);
      ctx.quadraticCurveTo(canvas.width * 0.55, canvas.height * 0.58, canvas.width * 0.7, canvas.height * 0.54);
      ctx.stroke();

      // Craters & impact speckles
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 180; i++) {
        const cx = Math.random() * canvas.width;
        const cy = Math.random() * canvas.height;
        const cr = 4 + Math.random() * 22;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = '#4a2016';
        ctx.fill();
        ctx.strokeStyle = '#e08360';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else {
      // The Moon: Silvery gray regolith with dark maria
      ctx.fillStyle = '#b5b5b5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dark lunar maria (Sea of Tranquility, Ocean of Storms, Sea of Serenity)
      const mariaColors = ['#5e5e62', '#6b6b70', '#545459', '#444449'];
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * canvas.width;
        const y = canvas.height * 0.2 + Math.random() * canvas.height * 0.6;
        const rad = 70 + Math.random() * 220;
        ctx.fillStyle = mariaColors[Math.floor(Math.random() * mariaColors.length)];
        ctx.globalAlpha = 0.55 + Math.random() * 0.35;
        ctx.beginPath();
        ctx.ellipse(x, y, rad, rad * 0.75, Math.random() * Math.PI, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright impact craters with radial ejecta rays (like Tycho and Copernicus)
      ctx.globalAlpha = 0.75;
      for (let i = 0; i < 200; i++) {
        const cx = Math.random() * canvas.width;
        const cy = Math.random() * canvas.height;
        const cr = 3 + Math.random() * 18;
        ctx.beginPath();
        ctx.arc(cx, cy, cr, 0, Math.PI * 2);
        ctx.fillStyle = '#404044';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Rays for larger craters
        if (cr > 10) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          for (let ray = 0; ray < 8; ray++) {
            const angle = (ray * Math.PI) / 4 + Math.random() * 0.2;
            const len = cr * (3 + Math.random() * 5);
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
            ctx.stroke();
          }
        }
      }
    }

    ctx.globalAlpha = 1.0;
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    return texture;
  }

  buildPlanet(body) {
    this.currentBody = body;

    // Remove existing meshes
    if (this.planetMesh) {
      this.scene.remove(this.planetMesh);
      if (this.planetMesh.geometry) this.planetMesh.geometry.dispose();
      if (this.planetMesh.material) this.planetMesh.material.dispose();
    }
    if (this.atmosphereMesh) {
      this.scene.remove(this.atmosphereMesh);
      if (this.atmosphereMesh.geometry) this.atmosphereMesh.geometry.dispose();
      if (this.atmosphereMesh.material) this.atmosphereMesh.material.dispose();
    }

    // Clear markers
    while (this.markerGroup.children.length > 0) {
      const obj = this.markerGroup.children[0];
      this.markerGroup.remove(obj);
    }
    this.markers = [];

    // Sphere geometry
    const geometry = new THREE.SphereGeometry(this.radius, 64, 64);
    const texture = this.createPlanetTexture(body);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: body === "Mars" ? 0.85 : 0.95,
      metalness: 0.1
    });

    this.planetMesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.planetMesh);

    // Atmosphere halo
    if (body === "Mars") {
      const atmosGeo = new THREE.SphereGeometry(this.radius * 1.035, 48, 48);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0xff6644,
        transparent: true,
        opacity: 0.14,
        side: THREE.BackSide
      });
      this.atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
      this.scene.add(this.atmosphereMesh);
    } else {
      // Very subtle silvery glow for Moon
      const atmosGeo = new THREE.SphereGeometry(this.radius * 1.02, 48, 48);
      const atmosMat = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide
      });
      this.atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
      this.scene.add(this.atmosphereMesh);
    }

    // Add markers for relics on this body
    this.populateMarkers();
  }

  // Convert lat/lon in degrees to 3D position vector on sphere
  latLonToVector3(lat, lon, radius = this.radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
  }

  populateMarkers() {
    const relics = RELICS_DATA.filter(r => r.body === this.currentBody);

    relics.forEach(relic => {
      const pos = this.latLonToVector3(relic.coordinates.lat, relic.coordinates.lon, this.radius * 1.01);
      
      // Marker pin container
      const pinContainer = new THREE.Group();
      pinContainer.position.copy(pos);

      // Orient marker so it points outward perpendicularly from sphere center
      pinContainer.lookAt(pos.clone().multiplyScalar(2));

      // 1. Glowing outer pulse ring
      const ringGeo = new THREE.RingGeometry(0.18, 0.28, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: relic.statusColor || 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      pinContainer.add(ring);

      // 2. Central Beacon Dot
      const dotGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: 0xffffff
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.z = 0.08;
      pinContainer.add(dot);

      // 3. Vertical antenna beam / stem
      const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
      const stemMat = new THREE.MeshBasicMaterial({
        color: relic.statusColor || 0x38bdf8,
        transparent: true,
        opacity: 0.7
      });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.rotation.x = Math.PI / 2;
      stem.position.z = 0.25;
      pinContainer.add(stem);

      // Invisible hit area sphere for easy clicking/hovering
      const hitGeo = new THREE.SphereGeometry(0.45, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeo, hitMat);
      pinContainer.add(hitMesh);

      // Tag for raycasting
      hitMesh.userData = { relic, ring, originalScale: 1.0 };

      this.markerGroup.add(pinContainer);
      this.markers.push({ group: pinContainer, hitMesh, ring, relic });
    });
  }

  setupInteraction() {
    const dom = this.renderer.domElement;

    // Mouse drag rotation
    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.autoRotate = false;
      this.previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      // Re-enable auto-rotation slowly if not interacting
      setTimeout(() => {
        if (!this.isDragging) this.autoRotate = true;
      }, 5000);
    });

    dom.addEventListener('mousemove', (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (this.isDragging) {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;

        this.planetMesh.rotation.y += deltaX * 0.005;
        this.planetMesh.rotation.x += deltaY * 0.005;

        // Keep markers attached to planet rotation
        this.markerGroup.rotation.y = this.planetMesh.rotation.y;
        this.markerGroup.rotation.x = this.planetMesh.rotation.x;

        this.previousMousePosition = { x: e.clientX, y: e.clientY };
        dom.style.cursor = 'grabbing';
      } else {
        // Raycasting for marker hover
        this.checkMarkerHover();
      }
    });

    // Touch support for tablets & mobile
    let touchStartPos = { x: 0, y: 0 };
    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.autoRotate = false;
        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    dom.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - touchStartPos.x;
        const deltaY = e.touches[0].clientY - touchStartPos.y;

        this.planetMesh.rotation.y += deltaX * 0.005;
        this.planetMesh.rotation.x += deltaY * 0.005;

        this.markerGroup.rotation.y = this.planetMesh.rotation.y;
        this.markerGroup.rotation.x = this.planetMesh.rotation.x;

        touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    dom.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Zoom on wheel
    dom.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.camera.position.z += e.deltaY * 0.01;
      this.camera.position.z = Math.max(7.5, Math.min(22, this.camera.position.z));
    }, { passive: false });

    // Click marker
    dom.addEventListener('click', (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      const hitMeshes = this.markers.map(m => m.hitMesh);
      const intersects = this.raycaster.intersectObjects(hitMeshes, false);

      if (intersects.length > 0) {
        const hitData = intersects[0].object.userData;
        if (hitData && hitData.relic) {
          if (window.spaceAudio) {
            window.spaceAudio.playRadarPing();
          }
          this.focusRelic(hitData.relic);
          if (this.onSelectRelic) {
            this.onSelectRelic(hitData.relic);
          }
        }
      }
    });
  }

  checkMarkerHover() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const hitMeshes = this.markers.map(m => m.hitMesh);
    const intersects = this.raycaster.intersectObjects(hitMeshes, false);
    const dom = this.renderer.domElement;

    const tooltip = document.getElementById('globe-tooltip');

    if (intersects.length > 0) {
      dom.style.cursor = 'pointer';
      const relic = intersects[0].object.userData.relic;

      if (tooltip) {
        tooltip.innerHTML = `
          <div class="font-bold text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full" style="background-color: ${relic.statusColor}"></span>
            ${relic.name}
          </div>
          <div class="text-xs text-cyan-300 font-mono">${relic.callsign}</div>
          <div class="text-xs text-slate-400 mt-1">${relic.coordinates.formatted}</div>
        `;
        tooltip.style.display = 'block';
      }
    } else {
      if (!this.isDragging) dom.style.cursor = 'grab';
      if (tooltip) tooltip.style.display = 'none';
    }
  }

  // Smoothly rotate the planet so the selected relic faces the camera front-and-center
  focusRelic(relic) {
    const latRad = relic.coordinates.lat * (Math.PI / 180);
    const lonRad = (relic.coordinates.lon + 180) * (Math.PI / 180);

    const targetRotX = latRad * 0.8;
    const targetRotY = -lonRad + Math.PI / 2;

    this.autoRotate = false;
    this.targetRotation = { x: targetRotX, y: targetRotY };
    this.isTransitioning = true;
  }

  switchBody(body) {
    if (this.currentBody === body) return;
    this.buildPlanet(body);
    if (window.spaceAudio) {
      window.spaceAudio.playTelemetryBeep();
    }
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 500;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Smoothly fly to target rotation if focus requested
    if (this.isTransitioning && this.targetRotation) {
      this.planetMesh.rotation.x += (this.targetRotation.x - this.planetMesh.rotation.x) * 0.08;
      this.planetMesh.rotation.y += (this.targetRotation.y - this.planetMesh.rotation.y) * 0.08;

      this.markerGroup.rotation.x = this.planetMesh.rotation.x;
      this.markerGroup.rotation.y = this.planetMesh.rotation.y;

      if (
        Math.abs(this.targetRotation.x - this.planetMesh.rotation.x) < 0.01 &&
        Math.abs(this.targetRotation.y - this.planetMesh.rotation.y) < 0.01
      ) {
        this.isTransitioning = false;
      }
    } else if (this.autoRotate && this.planetMesh) {
      this.planetMesh.rotation.y += 0.0015;
      this.markerGroup.rotation.y = this.planetMesh.rotation.y;
    }

    // Starfield slow drift
    if (this.starfield) {
      this.starfield.rotation.y += 0.0002;
    }

    // Pulse marker rings
    this.markers.forEach(m => {
      const scale = 1.0 + Math.sin(time * 4) * 0.25;
      m.ring.scale.set(scale, scale, 1);
    });

    this.renderer.render(this.scene, this.camera);
  }
}
