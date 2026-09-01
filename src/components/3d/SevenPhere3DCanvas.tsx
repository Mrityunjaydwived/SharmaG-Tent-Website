import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SevenPhere3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 2.5, 5.8);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambLight);

    const sunLight = new THREE.DirectionalLight(0xfff3d0, 2.5);
    sunLight.position.set(5, 8, 4);
    scene.add(sunLight);

    // Warm sacred fire point light
    const fireLight = new THREE.PointLight(0xff7700, 3.5, 12);
    fireLight.position.set(0, 0.5, 0);
    scene.add(fireLight);

    // Flipkart blue accent fill light
    const blueFill = new THREE.PointLight(0x1f74ba, 2.2, 10);
    blueFill.position.set(-4, 3, 2);
    scene.add(blueFill);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Materials
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf8d706,
      metalness: 0.85,
      roughness: 0.2,
    });
    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xdfa020,
      metalness: 0.9,
      roughness: 0.25,
    });
    const redMat = new THREE.MeshStandardMaterial({
      color: 0xc41e3a, // Royal bridal red
      metalness: 0.2,
      roughness: 0.4,
    });
    const ivoryMat = new THREE.MeshStandardMaterial({
      color: 0xfffaf0, // Royal groom sherwani ivory
      metalness: 0.15,
      roughness: 0.35,
    });
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x5c3317,
      roughness: 0.8,
    });

    // 1. Grand Sacred Mandap Base Platform
    const platformGeo = new THREE.CylinderGeometry(2.3, 2.5, 0.25, 36);
    const platform = new THREE.Mesh(platformGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 }));
    platform.position.y = -0.5;
    worldGroup.add(platform);

    const platformRingGeo = new THREE.TorusGeometry(2.35, 0.05, 16, 36);
    const platformRing = new THREE.Mesh(platformRingGeo, goldMat);
    platformRing.rotation.x = Math.PI / 2;
    platformRing.position.y = -0.38;
    worldGroup.add(platformRing);

    // 2. 4 Royal Mandap Golden Pillars
    const mandapPillarGeo = new THREE.CylinderGeometry(0.08, 0.09, 2.2, 16);
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const x = Math.cos(angle) * 1.7;
      const z = Math.sin(angle) * 1.7;
      const pillar = new THREE.Mesh(mandapPillarGeo, goldMat);
      pillar.position.set(x, 0.6, z);
      worldGroup.add(pillar);

      // Floral Capital Garland
      const capitalGeo = new THREE.TorusGeometry(0.14, 0.04, 8, 16);
      const capital = new THREE.Mesh(capitalGeo, redMat);
      capital.rotation.x = Math.PI / 2;
      capital.position.set(x, 1.7, z);
      worldGroup.add(capital);
    }

    // Royal Mandap Canopy Roof
    const canopyGeo = new THREE.ConeGeometry(2.4, 0.8, 16, 1, true);
    const canopy = new THREE.Mesh(canopyGeo, new THREE.MeshStandardMaterial({ color: 0x1f74ba, side: THREE.DoubleSide }));
    canopy.position.y = 2.1;
    worldGroup.add(canopy);

    const spireGeo = new THREE.ConeGeometry(0.18, 0.6, 16);
    const spire = new THREE.Mesh(spireGeo, goldMat);
    spire.position.y = 2.8;
    worldGroup.add(spire);

    // 3. Sacred Hawan Kund (वेदिका / हवन कुंड) in Center
    const kundBaseGeo = new THREE.BoxGeometry(0.9, 0.22, 0.9);
    const kundBase = new THREE.Mesh(kundBaseGeo, brassMat);
    kundBase.position.y = -0.28;
    worldGroup.add(kundBase);

    const kundUpperGeo = new THREE.BoxGeometry(0.7, 0.16, 0.7);
    const kundUpper = new THREE.Mesh(kundUpperGeo, woodMat);
    kundUpper.position.y = -0.12;
    worldGroup.add(kundUpper);

    // Hawan Samidha (Wood sticks)
    for (let i = 0; i < 4; i++) {
      const stickGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8);
      const stick = new THREE.Mesh(stickGeo, woodMat);
      stick.rotation.z = Math.PI / 4 * (i % 2 === 0 ? 1 : -1);
      stick.rotation.x = Math.PI / 4 * (i > 1 ? 1 : -1);
      stick.position.set(0, -0.02, 0);
      worldGroup.add(stick);
    }

    // Sacred Fire Flames (Glowing Central Flame)
    const flameGeo = new THREE.ConeGeometry(0.22, 0.55, 12);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const flameMesh = new THREE.Mesh(flameGeo, flameMat);
    flameMesh.position.y = 0.22;
    worldGroup.add(flameMesh);

    // Sacred Fire Sparks & Flying Holy Smoke Particles
    const firePartCount = 35;
    const firePartGeo = new THREE.BufferGeometry();
    const firePos = new Float32Array(firePartCount * 3);
    for (let i = 0; i < firePartCount; i++) {
      firePos[i * 3] = (Math.random() - 0.5) * 0.3;
      firePos[i * 3 + 1] = Math.random() * 0.8 + 0.1;
      firePos[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    firePartGeo.setAttribute('position', new THREE.BufferAttribute(firePos, 3));
    const firePartMat = new THREE.PointsMaterial({
      color: 0xff5500,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const fireParticles = new THREE.Points(firePartGeo, firePartMat);
    worldGroup.add(fireParticles);

    // 4. Dulha & Dulhan 3D Figurines (taking 7 Phere)
    const phereGroup = new THREE.Group();
    worldGroup.add(phereGroup);

    // --- DULHA (Groom) ---
    const groom = new THREE.Group();
    // Sherwani Torso
    const gTorsoGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.65, 16);
    const gTorso = new THREE.Mesh(gTorsoGeo, ivoryMat);
    gTorso.position.y = 0.25;
    groom.add(gTorso);

    // Head
    const gHeadGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const gHead = new THREE.Mesh(gHeadGeo, new THREE.MeshStandardMaterial({ color: 0xf3d2b8, roughness: 0.5 }));
    gHead.position.y = 0.68;
    groom.add(gHead);

    // Safa / Pagdi (Royal Saffron-Gold Turban)
    const gTurbanGeo = new THREE.TorusGeometry(0.15, 0.06, 12, 24);
    const gTurban = new THREE.Mesh(gTurbanGeo, goldMat);
    gTurban.rotation.x = Math.PI / 2;
    gTurban.position.y = 0.74;
    groom.add(gTurban);

    const gKalgiGeo = new THREE.ConeGeometry(0.04, 0.14, 8);
    const gKalgi = new THREE.Mesh(gKalgiGeo, redMat);
    gKalgi.position.set(0, 0.84, 0.12);
    groom.add(gKalgi);

    // Royal Stole / Dupatta
    const gDupattaGeo = new THREE.TorusGeometry(0.24, 0.03, 8, 24, Math.PI);
    const gDupatta = new THREE.Mesh(gDupattaGeo, redMat);
    gDupatta.rotation.x = Math.PI / 2;
    gDupatta.position.set(0, 0.35, 0);
    groom.add(gDupatta);

    phereGroup.add(groom);

    // --- DULHAN (Bride) ---
    const bride = new THREE.Group();
    // Royal Bridal Lehenga
    const bLehengaGeo = new THREE.ConeGeometry(0.35, 0.7, 24, 1, true);
    const bLehenga = new THREE.Mesh(bLehengaGeo, redMat);
    bLehenga.position.y = 0.15;
    bride.add(bLehenga);

    const bGoldBorderGeo = new THREE.TorusGeometry(0.35, 0.025, 8, 24);
    const bGoldBorder = new THREE.Mesh(bGoldBorderGeo, goldMat);
    bGoldBorder.rotation.x = Math.PI / 2;
    bGoldBorder.position.y = -0.2;
    bride.add(bGoldBorder);

    // Head
    const bHeadGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const bHead = new THREE.Mesh(bHeadGeo, new THREE.MeshStandardMaterial({ color: 0xf5d5bb, roughness: 0.5 }));
    bHead.position.y = 0.62;
    bride.add(bHead);

    // Chunari / Odhani
    const bChunariGeo = new THREE.SphereGeometry(0.18, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const bChunari = new THREE.Mesh(bChunariGeo, redMat);
    bChunari.position.y = 0.65;
    bride.add(bChunari);

    // Maang Tikka
    const bTikkaGeo = new THREE.SphereGeometry(0.03, 8, 8);
    const bTikka = new THREE.Mesh(bTikkaGeo, goldMat);
    bTikka.position.set(0, 0.67, 0.13);
    bride.add(bTikka);

    phereGroup.add(bride);

    // --- GATHBANDHAN (पवित्र गठबंधन गाँठ / Scarf connecting Groom & Bride) ---
    const knotCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.35, 0), // groom stole
      new THREE.Vector3(0.3, 0.25, 0), // hanging knot
      new THREE.Vector3(0.65, 0.3, 0), // bride chunari
    ]);
    const knotGeo = new THREE.TubeGeometry(knotCurve, 20, 0.022, 8, false);
    const knotMesh = new THREE.Mesh(knotGeo, redMat);
    phereGroup.add(knotMesh);

    // 5. Floating Flower Petals (गुलाब की पंखुड़ियाँ) Showering from above
    const petalCount = 60;
    const petalGeo = new THREE.BufferGeometry();
    const petalPos = new Float32Array(petalCount * 3);
    for (let i = 0; i < petalCount; i++) {
      petalPos[i * 3] = (Math.random() - 0.5) * 3.5;
      petalPos[i * 3 + 1] = Math.random() * 2.5 + 0.5;
      petalPos[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
    const petalMat = new THREE.PointsMaterial({
      color: 0xff3b6f, // Fresh Rose Pink/Red
      size: 0.07,
      transparent: true,
      opacity: 0.85,
    });
    const petals = new THREE.Points(petalGeo, petalMat);
    worldGroup.add(petals);

    // Animation Loop: 7 Phere circular orbit around Hawan Kund
    let reqId: number;
    let phereAngle = 0;
    const orbitRadius = 1.05;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Circular Phere motion
      phereAngle += 0.012; // Sacred slow paced parikrama

      // Groom leads
      const gx = Math.cos(phereAngle) * orbitRadius;
      const gz = Math.sin(phereAngle) * orbitRadius;
      groom.position.set(gx, 0, gz);
      groom.rotation.y = -phereAngle - Math.PI / 2;

      // Bride follows behind groom by offset angle
      const bx = Math.cos(phereAngle - 0.5) * orbitRadius;
      const bz = Math.sin(phereAngle - 0.5) * orbitRadius;
      bride.position.set(bx, 0, bz);
      bride.rotation.y = -(phereAngle - 0.5) - Math.PI / 2;

      // Update gathbandhan knot positions
      knotMesh.position.set((gx + bx) / 2, -0.05, (gz + bz) / 2);
      knotMesh.rotation.y = -phereAngle;

      // Leaping Hawan Fire effect
      const flameScale = 1 + Math.sin(Date.now() * 0.015) * 0.18;
      flameMesh.scale.set(flameScale, 1 + Math.cos(Date.now() * 0.02) * 0.22, flameScale);
      fireLight.intensity = 3.0 + Math.sin(Date.now() * 0.025) * 0.8;

      // Rising Fire Sparks
      const fPos = firePartGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < firePartCount * 3; i += 3) {
        fPos[i] += 0.012;
        if (fPos[i] > 1.2) {
          fPos[i] = 0.1;
          fPos[i - 1] = (Math.random() - 0.5) * 0.25;
          fPos[i + 1] = (Math.random() - 0.5) * 0.25;
        }
      }
      firePartGeo.attributes.position.needsUpdate = true;

      // Falling Rose Petals
      const pPos = petalGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < petalCount * 3; i += 3) {
        pPos[i] -= 0.007;
        if (pPos[i] < -0.3) {
          pPos[i] = 2.5;
        }
      }
      petalGeo.attributes.position.needsUpdate = true;

      // Subtle scene orbit
      worldGroup.rotation.y = Math.sin(Date.now() * 0.0008) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-80 sm:h-96 flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-b from-blue-50/60 via-white to-amber-50/40 border border-[#1F74BA]/20 shadow-xl">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      <div className="absolute top-4 left-4 z-20">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1F74BA] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
          <span>3D दृश्य: पवित्र हवन कुंड एवं सात फेरे</span>
        </span>
      </div>
      <div className="absolute bottom-3 inset-x-0 flex items-center justify-center pointer-events-none">
        <span className="text-[11px] font-semibold text-gray-600 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full border border-gray-200 shadow-xs">
          🌸 "अग्नि की साक्षी, सात फेरे और जन्मों-जन्म का अटूट बंधन"
        </span>
      </div>
    </div>
  );
};
