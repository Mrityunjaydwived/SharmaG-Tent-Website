import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, RotateCw } from 'lucide-react';

export const TentCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // --- SCENE & FOG ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xffffff, 0.025);

    // --- CAMERA ---
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 3.8, 9.5);

    // --- RENDERER ---
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- LIGHTING SYSTEM ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Sun key light
    const sunLight = new THREE.DirectionalLight(0xfff5e6, 2.6);
    sunLight.position.set(6, 12, 6);
    scene.add(sunLight);

    // Royal Blue fill light (Flipkart palette blue fill)
    const blueFillLight = new THREE.DirectionalLight(0x1f74ba, 1.2);
    blueFillLight.position.set(-6, 5, -5);
    scene.add(blueFillLight);

    // Chandelier warm yellow center light
    const chandelierLight = new THREE.PointLight(0xf8d706, 3.5, 14);
    chandelierLight.position.set(0, 3.4, 0);
    scene.add(chandelierLight);

    // Center Stage Uplight
    const stageUplight = new THREE.PointLight(0xf09120, 2.2, 8);
    stageUplight.position.set(0, 0.3, 0);
    scene.add(stageUplight);

    // Dynamic Fireworks Light (flashes in sky during burst)
    const fireworkFlashLight = new THREE.PointLight(0xffdd66, 0, 35);
    fireworkFlashLight.position.set(0, 9, -2);
    scene.add(fireworkFlashLight);

    // --- MAIN CELEBRATION SCENE GROUP ---
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // Pavilion Sub-group
    const pavilionGroup = new THREE.Group();
    sceneGroup.add(pavilionGroup);

    // --- SHARED MATERIALS ---
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8d706,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0xaa8800,
      emissiveIntensity: 0.15,
    });

    const ivoryFabricMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const royalBlueFabricMat = new THREE.MeshStandardMaterial({
      color: 0x1f74ba,
      roughness: 0.7,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const carpetMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a5b94,
      roughness: 0.8,
      metalness: 0.1,
    });

    const marbleMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f4f4,
      roughness: 0.35,
      metalness: 0.2,
    });

    // 1. CIRCULAR MULTI-TIER ROYAL STAGE (Pitham)
    const stage1 = new THREE.Mesh(
      new THREE.CylinderGeometry(5.2, 5.4, 0.16, 40),
      marbleMaterial
    );
    stage1.position.y = -0.08;
    pavilionGroup.add(stage1);

    const stage1Trim = new THREE.Mesh(
      new THREE.TorusGeometry(5.22, 0.035, 12, 40),
      goldMaterial
    );
    stage1Trim.rotation.x = Math.PI / 2;
    stage1Trim.position.y = 0.01;
    pavilionGroup.add(stage1Trim);

    const stage2 = new THREE.Mesh(
      new THREE.CylinderGeometry(4.4, 4.4, 0.14, 36),
      carpetMaterial
    );
    stage2.position.y = 0.07;
    pavilionGroup.add(stage2);

    const centerRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.04, 16, 32),
      goldMaterial
    );
    centerRing.rotation.x = Math.PI / 2;
    centerRing.position.y = 0.15;
    pavilionGroup.add(centerRing);

    // 2. ORNATE ROYAL PILLARS (8 Pillars in Octagon)
    const pillarRadius = 3.8;
    const pillarCount = 8;
    const pillarGeo = new THREE.CylinderGeometry(0.08, 0.11, 3.4, 20);

    for (let i = 0; i < pillarCount; i++) {
      const angle = (i / pillarCount) * Math.PI * 2;
      const x = Math.cos(angle) * pillarRadius;
      const z = Math.sin(angle) * pillarRadius;

      // Base Pedestal
      const baseBox = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, 0.3, 8),
        goldMaterial
      );
      baseBox.position.set(x, 0.22, z);
      pavilionGroup.add(baseBox);

      // Fluted Pillar Column
      const pillar = new THREE.Mesh(pillarGeo, goldMaterial);
      pillar.position.set(x, 1.85, z);
      pavilionGroup.add(pillar);

      // Carved Capital on top of column
      const capitalMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.28, 0.18, 0.22, 12),
        goldMaterial
      );
      capitalMesh.position.set(x, 3.55, z);
      pavilionGroup.add(capitalMesh);

      // Silk Curtain Drapes
      const drapeCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x * 0.95, 3.5, z * 0.95),
        new THREE.Vector3(x * 1.05, 2.3, z * 1.05),
        new THREE.Vector3(x * 0.92, 1.2, z * 0.92),
        new THREE.Vector3(x * 0.88, 0.2, z * 0.88),
      ]);
      const drapeGeo = new THREE.TubeGeometry(drapeCurve, 16, 0.09, 8, false);
      const drapeMesh = new THREE.Mesh(
        drapeGeo,
        i % 2 === 0 ? royalBlueFabricMat : ivoryFabricMat
      );
      pavilionGroup.add(drapeMesh);

      // Golden tie-back band
      const bandGeo = new THREE.TorusGeometry(0.13, 0.03, 12, 16);
      bandGeo.rotateX(Math.PI / 2);
      const bandMesh = new THREE.Mesh(bandGeo, goldMaterial);
      bandMesh.position.set(x * 0.98, 1.7, z * 0.98);
      pavilionGroup.add(bandMesh);
    }

    // 3. GOLDEN SCALLOPED ARCHWAYS (TORANA)
    for (let i = 0; i < pillarCount; i++) {
      const angle1 = (i / pillarCount) * Math.PI * 2;
      const angle2 = ((i + 1) / pillarCount) * Math.PI * 2;

      const p1 = new THREE.Vector3(Math.cos(angle1) * pillarRadius, 3.55, Math.sin(angle1) * pillarRadius);
      const p2 = new THREE.Vector3(Math.cos(angle2) * pillarRadius, 3.55, Math.sin(angle2) * pillarRadius);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += 0.45;

      const archCurve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const archGeo = new THREE.TubeGeometry(archCurve, 16, 0.05, 8, false);
      const archMesh = new THREE.Mesh(archGeo, goldMaterial);
      pavilionGroup.add(archMesh);

      const bellMesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.07, 0.14, 8),
        goldMaterial
      );
      bellMesh.position.set(mid.x, mid.y - 0.15, mid.z);
      bellMesh.rotation.x = Math.PI;
      pavilionGroup.add(bellMesh);
    }

    // 4. MULTI-TIERED ROYAL CANOPY ROOF
    const lowerCanopyGeo = new THREE.ConeGeometry(4.5, 1.6, 16, 1, true);
    const lowerCanopy = new THREE.Mesh(lowerCanopyGeo, ivoryFabricMat);
    lowerCanopy.position.y = 4.4;
    pavilionGroup.add(lowerCanopy);

    const valenceBand = new THREE.Mesh(
      new THREE.CylinderGeometry(4.52, 4.55, 0.22, 32, 1, true),
      royalBlueFabricMat
    );
    valenceBand.position.y = 3.65;
    pavilionGroup.add(valenceBand);

    const upperCanopyGeo = new THREE.ConeGeometry(2.6, 1.4, 16, 1, true);
    const upperCanopy = new THREE.Mesh(upperCanopyGeo, ivoryFabricMat);
    upperCanopy.position.y = 5.7;
    pavilionGroup.add(upperCanopy);

    // Gold Ribs
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.cos(angle) * 4.45;
      const z = Math.sin(angle) * 4.45;
      const ribCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 6.4, 0),
        new THREE.Vector3(x * 0.45, 5.5, z * 0.45),
        new THREE.Vector3(x, 3.6, z),
      ]);
      const ribGeo = new THREE.TubeGeometry(ribCurve, 14, 0.035, 8, false);
      const ribMesh = new THREE.Mesh(ribGeo, goldMaterial);
      pavilionGroup.add(ribMesh);
    }

    // 5. GOLDEN KALASH & PINNACLE
    const finialGroup = new THREE.Group();
    finialGroup.position.set(0, 6.45, 0);

    const kalashBase = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.2, 16), goldMaterial);
    const kalashPot = new THREE.Mesh(new THREE.SphereGeometry(0.26, 16, 16), goldMaterial);
    kalashPot.position.y = 0.2;
    const kalashSpire = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.45, 16), goldMaterial);
    kalashSpire.position.y = 0.52;

    finialGroup.add(kalashBase, kalashPot, kalashSpire);
    pavilionGroup.add(finialGroup);

    // 6. CHANDELIER
    const chandelier = new THREE.Group();
    chandelier.position.set(0, 3.6, 0);

    const rings = [0.8, 0.5, 0.28];
    rings.forEach((r, idx) => {
      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.025, 12, 32),
        goldMaterial
      );
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -idx * 0.28;
      chandelier.add(ringMesh);

      const crystalCount = Math.round(r * 18);
      const crystalGeo = new THREE.OctahedronGeometry(0.06);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xf8d706,
        emissiveIntensity: 0.7,
        roughness: 0.1,
      });

      for (let c = 0; c < crystalCount; c++) {
        const a = (c / crystalCount) * Math.PI * 2;
        const crystal = new THREE.Mesh(crystalGeo, crystalMat);
        crystal.position.set(Math.cos(a) * r, -idx * 0.28 - 0.14, Math.sin(a) * r);
        chandelier.add(crystal);
      }
    });
    pavilionGroup.add(chandelier);

    // 7. 3D DJ BARAAT SOUND TRUCK / CAR (बरात डीजे गाड़ी)
    const djCarGroup = new THREE.Group();
    djCarGroup.position.set(4.8, 0, 1.2);
    djCarGroup.rotation.y = -Math.PI / 5;

    // Truck Chassis / Lower Body
    const truckBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f74ba, // Flipkart Royal Blue DJ Truck
      roughness: 0.35,
      metalness: 0.6,
    });
    const truckCabinMat = new THREE.MeshStandardMaterial({
      color: 0x0f4a7c,
      roughness: 0.2,
      metalness: 0.8,
    });
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.1,
    });
    const wheelMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.8,
    });

    // Cabin
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.0, 1.4), truckCabinMat);
    cabin.position.set(0, 0.7, 1.0);
    djCarGroup.add(cabin);

    // Windshield
    const windshield = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 0.45, 0.05),
      new THREE.MeshStandardMaterial({ color: 0x88ccff, roughness: 0.1, metalness: 0.9 })
    );
    windshield.position.set(0, 0.85, 1.72);
    djCarGroup.add(windshield);

    // Headlights
    const headlightMat = new THREE.MeshBasicMaterial({ color: 0xfff3a0 });
    [-0.45, 0.45].forEach((hx) => {
      const hl = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 12), headlightMat);
      hl.rotation.x = Math.PI / 2;
      hl.position.set(hx, 0.4, 1.72);
      djCarGroup.add(hl);

      // Light beam from headlights
      const hlBeam = new THREE.SpotLight(0xfff7c2, 1.8, 8, Math.PI / 6, 0.4);
      hlBeam.position.set(hx, 0.4, 1.75);
      hlBeam.target.position.set(hx, 0.1, 5);
      djCarGroup.add(hlBeam);
      djCarGroup.add(hlBeam.target);
    });

    // Wheels (4 Wheels)
    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    wheelGeo.rotateZ(Math.PI / 2);
    [
      [-0.65, 0.3, 0.9],
      [0.65, 0.3, 0.9],
      [-0.65, 0.3, -0.7],
      [0.65, 0.3, -0.7],
    ].forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.position.set(wx, wy, wz);
      djCarGroup.add(wheel);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.22, 12), chromeMat);
      rim.rotation.z = Math.PI / 2;
      rim.position.set(wx, wy, wz);
      djCarGroup.add(rim);
    });

    // Rear Sound Bed
    const soundBed = new THREE.Mesh(new THREE.BoxGeometry(1.35, 0.5, 2.0), truckBodyMat);
    soundBed.position.set(0, 0.5, -0.4);
    djCarGroup.add(soundBed);

    // DJ Sound Box / Line Array Subwoofer Stack
    const speakerMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.9,
    });
    const coneMat = new THREE.MeshStandardMaterial({
      color: 0xf8d706, // Gold cones
      roughness: 0.4,
    });

    // Dual Massive Bass Towers on Bed
    const bassTower = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.4, 0.8), speakerMat);
    bassTower.position.set(0, 1.4, -0.4);
    djCarGroup.add(bassTower);

    // 4 Big Speaker Cones on Tower
    [
      [-0.3, 1.6, 0.02],
      [0.3, 1.6, 0.02],
      [-0.3, 1.1, 0.02],
      [0.3, 1.1, 0.02],
    ].forEach(([sx, sy, sz]) => {
      const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.12, 0.04, 16), coneMat);
      cone.rotation.x = Math.PI / 2;
      cone.position.set(sx, sy, -0.4 + sz + 0.4);
      djCarGroup.add(cone);
    });

    // Overhead DJ Light Truss with 3 Sharpy Moving Beam lights
    const djTruss = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), chromeMat);
    djTruss.rotation.z = Math.PI / 2;
    djTruss.position.set(0, 2.4, -0.4);
    djCarGroup.add(djTruss);

    const sharpyBeams: THREE.SpotLight[] = [];
    const sharpyColors = [0x00e5ff, 0xff007f, 0xf8d706];

    [-0.45, 0, 0.45].forEach((tx, idx) => {
      const head = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.16, 12), chromeMat);
      head.position.set(tx, 2.3, -0.4);
      djCarGroup.add(head);

      const beamLight = new THREE.SpotLight(sharpyColors[idx], 3.5, 12, Math.PI / 7, 0.3);
      beamLight.position.set(tx, 2.2, -0.4);
      beamLight.target.position.set(tx * 2, 7, tx * 2);
      djCarGroup.add(beamLight);
      djCarGroup.add(beamLight.target);
      sharpyBeams.push(beamLight);
    });

    // Front Brand Badge on DJ Truck
    const brandBoard = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.04), goldMaterial);
    brandBoard.position.set(0, 1.35, 1.05);
    djCarGroup.add(brandBoard);

    sceneGroup.add(djCarGroup);

    // 8. 3D ROAD LIGHTING (बाराती फैंसी रोड लाइट एवं मेहराब)
    const roadLightsGroup = new THREE.Group();
    const roadLightPillars: THREE.PointLight[] = [];

    // Left and Right roadway pillars flanking the celebration avenue
    const roadPoints = [
      { x: -4.8, z: 3.5 },
      { x: -5.4, z: 1.0 },
      { x: -5.2, z: -1.8 },
      { x: -4.5, z: -4.2 },
      { x: 3.8, z: -3.8 },
      { x: 4.8, z: -1.6 },
    ];

    roadPoints.forEach((pos, idx) => {
      const pillarGroup = new THREE.Group();
      pillarGroup.position.set(pos.x, 0, pos.z);

      // Fancy Golden Lamp Post
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.07, 2.6, 12),
        goldMaterial
      );
      post.position.y = 1.3;
      pillarGroup.add(post);

      // Traditional ornate carved lantern top
      const lanternBase = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 0.15, 6),
        goldMaterial
      );
      lanternBase.position.y = 2.6;
      pillarGroup.add(lanternBase);

      const glassLantern = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.14, 0.35, 6),
        new THREE.MeshBasicMaterial({
          color: idx % 2 === 0 ? 0xffea79 : 0xff9933,
        })
      );
      glassLantern.position.y = 2.85;
      pillarGroup.add(glassLantern);

      const lanternCap = new THREE.Mesh(
        new THREE.ConeGeometry(0.24, 0.2, 6),
        goldMaterial
      );
      lanternCap.position.y = 3.1;
      pillarGroup.add(lanternCap);

      // Dynamic Road Glow Light
      const pLight = new THREE.PointLight(
        idx % 2 === 0 ? 0xffea79 : 0xff9933,
        1.5,
        5
      );
      pLight.position.y = 2.9;
      pillarGroup.add(pLight);
      roadLightPillars.push(pLight);

      // Hanging flower garland from post
      const garlandCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 2.6, 0),
        new THREE.Vector3(0.15, 1.7, 0.1),
        new THREE.Vector3(0.05, 0.8, 0.05),
      ]);
      const garlandGeo = new THREE.TubeGeometry(garlandCurve, 10, 0.04, 6, false);
      const garland = new THREE.Mesh(
        garlandGeo,
        new THREE.MeshStandardMaterial({ color: 0xf09120, roughness: 0.7 })
      );
      pillarGroup.add(garland);

      roadLightsGroup.add(pillarGroup);
    });

    // Illuminated Fairy Light Arches between side road pillars
    for (let a = 0; a < 3; a++) {
      const pA = roadPoints[a];
      const pB = roadPoints[a + 1];
      const archCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(pA.x, 2.6, pA.z),
        new THREE.Vector3((pA.x + pB.x) / 2, 3.4, (pA.z + pB.z) / 2),
        new THREE.Vector3(pB.x, 2.6, pB.z),
      ]);
      const archGeo = new THREE.TubeGeometry(archCurve, 16, 0.02, 6, false);
      const archWire = new THREE.Mesh(
        archGeo,
        new THREE.MeshBasicMaterial({ color: 0xffea79 })
      );
      roadLightsGroup.add(archWire);
    }

    sceneGroup.add(roadLightsGroup);

    // 9. DYNAMIC 3D FIREWORKS SYSTEM (शाही आतिशबाजी व स्काई रॉकेट)
    const fireworkParticlesCount = 350;
    const fireworkGeo = new THREE.BufferGeometry();
    const fwPositions = new Float32Array(fireworkParticlesCount * 3);
    const fwColors = new Float32Array(fireworkParticlesCount * 3);

    // Initialize fireworks particle arrays
    interface FireworkBurst {
      originX: number;
      originY: number;
      originZ: number;
      active: boolean;
      time: number;
      duration: number;
      color: THREE.Color;
    }

    const fwBursts: FireworkBurst[] = [
      { originX: -3.5, originY: 7.5, originZ: -2.5, active: true, time: 0, duration: 2.2, color: new THREE.Color(0xf8d706) },
      { originX: 2.5, originY: 8.5, originZ: -3.0, active: true, time: 1.1, duration: 2.2, color: new THREE.Color(0x00e5ff) },
      { originX: 0, originY: 9.0, originZ: -4.0, active: true, time: 0.6, duration: 2.2, color: new THREE.Color(0xff2a6d) },
    ];

    // Seed initial positions
    for (let i = 0; i < fireworkParticlesCount; i++) {
      fwPositions[i * 3] = 0;
      fwPositions[i * 3 + 1] = -100;
      fwPositions[i * 3 + 2] = 0;

      fwColors[i * 3] = 1;
      fwColors[i * 3 + 1] = 0.8;
      fwColors[i * 3 + 2] = 0;
    }

    fireworkGeo.setAttribute('position', new THREE.BufferAttribute(fwPositions, 3));
    fireworkGeo.setAttribute('color', new THREE.BufferAttribute(fwColors, 3));

    const fireworkMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fireworksPoints = new THREE.Points(fireworkGeo, fireworkMat);
    scene.add(fireworksPoints);

    // Particle Velocity storage for realistic explosion physics
    const velocities: { vx: number; vy: number; vz: number; burstIdx: number }[] = [];
    for (let i = 0; i < fireworkParticlesCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 1.2 + Math.random() * 2.4;

      velocities.push({
        vx: Math.sin(phi) * Math.cos(theta) * speed,
        vy: Math.sin(phi) * Math.sin(theta) * speed,
        vz: Math.cos(phi) * speed,
        burstIdx: i % fwBursts.length,
      });
    }

    // 10. CELEBRATION ROSE & MARIGOLD PETALS (पुष्प वर्षा)
    const petalCount = 70;
    const petalsGroup = new THREE.Group();
    const petalGeos = [
      new THREE.SphereGeometry(0.09, 6, 6),
      new THREE.SphereGeometry(0.08, 6, 6),
    ];
    petalGeos.forEach((g) => g.scale(1.2, 0.25, 0.8));

    const marigoldMat = new THREE.MeshStandardMaterial({
      color: 0xf09120,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const roseMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });

    interface PetalData {
      mesh: THREE.Mesh;
      speedY: number;
      rotSpeedX: number;
      rotSpeedZ: number;
      radius: number;
      angle: number;
      angularSpeed: number;
    }

    const petals: PetalData[] = [];

    for (let p = 0; p < petalCount; p++) {
      const isRose = p % 2 === 0;
      const mesh = new THREE.Mesh(
        isRose ? petalGeos[1] : petalGeos[0],
        isRose ? roseMat : marigoldMat
      );

      const radius = 1.0 + Math.random() * 3.8;
      const angle = Math.random() * Math.PI * 2;
      const y = Math.random() * 6.5;

      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);

      petalsGroup.add(mesh);
      petals.push({
        mesh,
        speedY: 0.008 + Math.random() * 0.012,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedZ: (Math.random() - 0.5) * 0.04,
        radius,
        angle,
        angularSpeed: 0.004 + Math.random() * 0.008,
      });
    }
    sceneGroup.add(petalsGroup);

    // 11. GOLDEN SPARKLE DUST
    const sparkleCount = 150;
    const sparkleGeo = new THREE.BufferGeometry();
    const sPositions = new Float32Array(sparkleCount * 3);

    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sPositions[i] = (Math.random() - 0.5) * 11;
      sPositions[i + 1] = Math.random() * 7;
      sPositions[i + 2] = (Math.random() - 0.5) * 11;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sPositions, 3));

    const sparkles = new THREE.Points(
      sparkleGeo,
      new THREE.PointsMaterial({
        color: 0xf8d706,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
    );
    sceneGroup.add(sparkles);

    // --- INTERACTIVE ORBIT & DRAG ROTATION ---
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;
    let currentRotationY = 0;
    let currentRotationX = 0.08;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      rotationVelocityY = deltaX * 0.006;
      rotationVelocityX = deltaY * 0.003;

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION LOOP ---
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Inertia & Auto-Rotation
      if (!isDragging) {
        currentRotationY += 0.25 * delta;
        rotationVelocityY *= 0.95;
        rotationVelocityX *= 0.95;
      }

      currentRotationY += rotationVelocityY;
      currentRotationX += rotationVelocityX;
      currentRotationX = Math.max(-0.25, Math.min(0.35, currentRotationX));

      sceneGroup.rotation.y = currentRotationY;
      sceneGroup.rotation.x = currentRotationX;

      // Animate Sharpy Beams on DJ Truck
      sharpyBeams.forEach((beam, idx) => {
        const sweepAngle = Math.sin(now * 0.003 + idx * 1.5) * 4.0;
        beam.target.position.x = djCarGroup.position.x + sweepAngle;
        beam.target.position.y = 8 + Math.cos(now * 0.004 + idx) * 2;
        beam.target.position.z = djCarGroup.position.z + Math.cos(now * 0.003 + idx) * 3;
      });

      // Animate Road Light flickering/pulsing
      roadLightPillars.forEach((pLight, idx) => {
        pLight.intensity = 1.3 + Math.sin(now * 0.005 + idx) * 0.4;
      });

      // Animate Fireworks Explosion Cycles
      fwBursts.forEach((b) => {
        b.time += delta;
        if (b.time > b.duration) {
          b.time = 0;
          // Randomize new burst launch sky position
          b.originX = (Math.random() - 0.5) * 8;
          b.originY = 6.5 + Math.random() * 3.0;
          b.originZ = -2.0 - Math.random() * 3.5;
        }
      });

      const posAttr = fireworkGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = fireworkGeo.attributes.color as THREE.BufferAttribute;
      let maxFlashIntensity = 0;

      for (let i = 0; i < fireworkParticlesCount; i++) {
        const vel = velocities[i];
        const burst = fwBursts[vel.burstIdx];
        const progress = burst.time / burst.duration;

        if (progress < 0.1) {
          // Launch streak going up
          const launchP = progress / 0.1;
          posAttr.setXYZ(
            i,
            burst.originX * launchP,
            launchP * burst.originY,
            burst.originZ * launchP
          );
          colAttr.setXYZ(i, 1, 0.9, 0.6);
        } else {
          // Radial explosive burst with gravity fall
          const burstAge = (progress - 0.1) / 0.9;
          const decay = Math.pow(1 - burstAge, 0.6);
          const currentDist = burstAge * 2.8;

          posAttr.setXYZ(
            i,
            burst.originX + vel.vx * currentDist,
            burst.originY + vel.vy * currentDist - burstAge * burstAge * 2.2, // gravity
            burst.originZ + vel.vz * currentDist
          );

          // Fade out color
          colAttr.setXYZ(
            i,
            burst.color.r * decay,
            burst.color.g * decay,
            burst.color.b * decay
          );

          if (burstAge < 0.25) {
            maxFlashIntensity = Math.max(maxFlashIntensity, (1 - burstAge * 4) * 2.5);
          }
        }
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Sky flash from fireworks
      fireworkFlashLight.intensity = maxFlashIntensity;

      // Animate floating petals
      petals.forEach((p) => {
        p.angle += p.angularSpeed;
        p.mesh.position.x = Math.cos(p.angle) * p.radius;
        p.mesh.position.z = Math.sin(p.angle) * p.radius;
        p.mesh.position.y -= p.speedY;

        p.mesh.rotation.x += p.rotSpeedX;
        p.mesh.rotation.z += p.rotSpeedZ;

        if (p.mesh.position.y < 0.1) {
          p.mesh.position.y = 6.2 + Math.random() * 0.8;
          p.radius = 1.0 + Math.random() * 3.6;
        }
      });

      // Pulsing chandelier and stage lights
      sparkles.rotation.y += 0.05 * delta;
      chandelierLight.intensity = 3.2 + Math.sin(now * 0.004) * 0.6;
      stageUplight.intensity = 2.0 + Math.cos(now * 0.003) * 0.4;

      renderer.render(scene, camera);
    };
    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full h-[560px] md:h-[650px] overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/40 via-white to-white select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Floating Interactive Badge */}
      <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 border border-[#1F74BA]/25 shadow-lg backdrop-blur-md text-xs font-bold text-[#111827] transition-transform duration-300">
        <RotateCw className={`w-3.5 h-3.5 text-[#1F74BA] ${isHovered ? 'animate-spin' : ''}`} />
        <span>3D शाही मंडप, डीजे गाड़ी, रोड लाइट व आतिशबाजी (360° घुमाएं)</span>
      </div>

      {/* Feature tags pills on top */}
      <div className="pointer-events-none absolute top-4 right-4 flex flex-col sm:flex-row items-end sm:items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-gray-200 text-[11px] font-bold text-[#1F74BA] shadow-sm">
          <Sparkles className="w-3 h-3 text-[#F8D706]" />
          <span>लाइव आतिशबाजी व डीजे बीम</span>
        </div>
      </div>
    </div>
  );
};
